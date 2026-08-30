# سيرفر وصلة

سيرفر بسيط بيربط بين الأكواد ويوصل طلبات المحادثة والرسائل بينهم لحظيًا (Socket.io).

## خطوات النشر (من الموبايل، من غير كمبيوتر) — Render.com

1. اعمل حساب على render.com (تقدر تسجل دخول بحساب GitHub بتاعك مباشرة).
2. ارفع فولدر `wasla-backend` ده كـ Repository منفصل على GitHub (أو داخل نفس الريبو في فولدر فرعي).
3. في Render: New + → Web Service → اختار الريبو ده.
4. الإعدادات:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - اختار الخطة المجانية (Free)
5. بعد ما الديبلوي يخلص، Render هيديك رابط زي:
   `https://wasla-backend-xxxx.onrender.com`
6. انسخ الرابط ده وحطه بدل `YOUR-BACKEND-URL.onrender.com` في ملف:
   `wasla-android/app/src/main/java/com/wasla/app/SocketManager.kt`
   (في سطر `const val BASE_URL = ...`)
7. بعد التعديل، ارفع مشروع الأندرويد على GitHub وخلي الـ GitHub Actions يبني الـ APK زي ما عملت قبل كده.

## ملحوظة عن وضع "أوفلاين"
السيرفر ده بيشتغل بس لما في إنترنت. وضع الأوفلاين الحقيقي (اتصال مباشر بين جهازين قريبين من بعض بدون نت) محتاج خطوة تانية منفصلة باستخدام Android Nearby Connections API — مش موجودة في النسخة دي، وتقدر نضيفها بعدين كخطوة تالية.
