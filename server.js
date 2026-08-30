const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.send('سيرفر وصلة شغال ✅');
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// كل كود متصل بالسيرفر بيتخزن هنا: code -> socket.id
const onlineCodes = new Map();

// كل محادثة (فردية أو مجموعة): chatId -> { members: [codes], type: 'direct' | 'group', name }
const chats = new Map();

function socketOfCode(code) {
  const socketId = onlineCodes.get(code);
  return socketId ? io.sockets.sockets.get(socketId) : null;
}

io.on('connection', (socket) => {

  socket.on('register', ({ code }) => {
    socket.data.code = code;
    onlineCodes.set(code, socket.id);
  });

  // شخص بيبعت طلب محادثة لصاحب كود معين
  socket.on('request_chat', ({ fromCode, toCode, chatId }) => {
    chats.set(chatId, { members: [fromCode, toCode], type: 'direct' });
    const targetSocket = socketOfCode(toCode);
    if (targetSocket) {
      targetSocket.emit('incoming_request', { chatId, fromCode });
    }
    // ملحوظة: لو الطرف الآخر أوفلاين، الطلب مش هيوصله دلوقتي.
    // لتفعيل التخزين والتسليم لاحقًا، ممكن تضيف قاعدة بيانات هنا (مثلاً SQLite أو MongoDB)
    // تحفظ الطلبات المعلقة وتبعتها أول ما الكود ده يرجع أونلاين.
  });

  // صاحب الكود بيوافق أو يرفض الطلب
  socket.on('respond_chat', ({ chatId, toCode, accepted }) => {
    const targetSocket = socketOfCode(toCode);
    if (targetSocket) {
      targetSocket.emit('request_response', { chatId, accepted });
    }
    if (!accepted) {
      chats.delete(chatId);
    }
  });

  // إرسال رسالة داخل محادثة قائمة
  socket.on('send_message', ({ chatId, text }) => {
    const chat = chats.get(chatId);
    if (!chat) return;
    const fromCode = socket.data.code;
    chat.members
      .filter((code) => code !== fromCode)
      .forEach((code) => {
        const targetSocket = socketOfCode(code);
        if (targetSocket) {
          targetSocket.emit('new_message', { chatId, fromCode, text });
        }
      });
  });

  // إنشاء مجموعة من كذا كود
  socket.on('create_group', ({ chatId, name, codes }) => {
    chats.set(chatId, { members: codes, type: 'group', name });
    const creatorCode = socket.data.code;
    codes
      .filter((code) => code !== creatorCode)
      .forEach((code) => {
        const targetSocket = socketOfCode(code);
        if (targetSocket) {
          targetSocket.emit('group_invite', { chatId, name });
        }
      });
  });

  socket.on('disconnect', () => {
    if (socket.data.code) {
      onlineCodes.delete(socket.data.code);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`السيرفر شغال على البورت ${PORT}`);
});
