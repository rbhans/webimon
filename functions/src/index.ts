import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// === SECTION: Helpers ===
function applyPetTick(pet: any) {
  const updated = { ...pet };
  updated.hunger = Math.min((pet.hunger || 0) + 1, 10);
  return updated;
}

// === SECTION: Tick Pet ===
export const tickPet = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(async () => {
    const snap = await admin.database().ref('pets').once('value');
    const updates: Record<string, any> = {};
    snap.forEach(child => {
      updates[child.key!] = applyPetTick(child.val());
    });
    await admin.database().ref('pets').update(updates);
  });

// === SECTION: Resolve Battle ===
export const resolveBattle = functions.https.onCall(async (data, context) => {
  const { battleId } = data;
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'auth required');
  }
  const battleRef = admin.database().ref(`battles/${battleId}`);
  const battle = (await battleRef.once('value')).val();
  if (!battle) {
    throw new functions.https.HttpsError('not-found', 'battle not found');
  }
  // very simple rng
  const winner = Math.random() > 0.5 ? battle.a : battle.b;
  await battleRef.update({ winner, resolved: true });
  await admin.firestore().collection('battleLogs').add({ battleId, winner, at: Date.now() });
  return { winner };
});
