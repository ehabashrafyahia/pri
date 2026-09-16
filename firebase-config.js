// firebase-config.js
// ============================================================
// استبدل القيم دي ببيانات مشروعك من Firebase Console:
// Project Settings → General → Your apps → SDK setup and configuration
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  onValue,
  push,
  remove,
  serverTimestamp,
  onDisconnect,
  off
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC0hV1pUOf-cEMrANro3RkBe3N5VBRVoAU",
  authDomain: "quiz-bc940.firebaseapp.com",
  databaseURL: "https://quiz-bc940-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quiz-bc940",
  storageBucket: "quiz-bc940.firebasestorage.app",
  messagingSenderId: "112678948959",
  appId: "1:112678948959:web:1b6d69289af5659b4dcbea"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/** يولّد كود غرفة من 6 أرقام غير مستخدم حاليًا */
export async function generateRoomCode() {
  let code;
  let exists = true;
  let attempts = 0;
  while (exists && attempts < 20) {
    code = String(Math.floor(100000 + Math.random() * 900000));
    const snap = await get(ref(db, `rooms/${code}`));
    exists = snap.exists();
    attempts++;
  }
  if (exists) throw new Error("تعذر إنشاء كود فريد، حاول مرة أخرى");
  return code;
}

/** إنشاء غرفة جديدة */
export async function createRoom(roomCode, questions) {
  await set(ref(db, `rooms/${roomCode}`), {
    status: "waiting",
    currentQuestionIndex: -1,
    questionStartTime: null,
    createdAt: serverTimestamp(),
    questions: questions,
    players: {},
    answers: {}
  });
}

/** انضمام لاعب لغرفة */
export async function joinRoom(roomCode, playerName) {
  const roomSnap = await get(ref(db, `rooms/${roomCode}`));
  if (!roomSnap.exists()) {
    throw new Error("ROOM_NOT_FOUND");
  }
  const data = roomSnap.val();
  if (data.status !== "waiting") {
    throw new Error("ROOM_ALREADY_STARTED");
  }
  // منع الأسماء المكررة بنفس الحروف (اختياري بسيط)
  const existing = Object.values(data.players || {});
  if (existing.some(p => (p.name || "").trim().toLowerCase() === playerName.trim().toLowerCase())) {
    throw new Error("NAME_TAKEN");
  }
  const playerRef = push(ref(db, `rooms/${roomCode}/players`));
  await set(playerRef, {
    name: playerName.trim(),
    score: 0,
    joinedAt: serverTimestamp()
  });
  return playerRef.key;
}

/** إرسال إجابة لاعب */
export async function submitAnswer(roomCode, questionIndex, playerId, choiceIndex, timeMs) {
  await set(
    ref(db, `rooms/${roomCode}/answers/${questionIndex}/${playerId}`),
    { choiceIndex, timeMs }
  );
}

/** تحديث حالة الغرفة (المضيف فقط) */
export async function updateRoom(roomCode, data) {
  await update(ref(db, `rooms/${roomCode}`), data);
}

/** حذف الغرفة عند الانتهاء */
export async function deleteRoom(roomCode) {
  await remove(ref(db, `rooms/${roomCode}`));
}

export { db, ref, onValue, get, set, update, serverTimestamp, onDisconnect, off, remove };
