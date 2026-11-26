# Brain Quiz Android

هذا المشروع يحوّل نسخة HTML من لعبة Brain Quiz إلى تطبيق Android محلي باستخدام WebView.

- اسم التطبيق: Brain Quiz
- معرّف الحزمة: com.brainquiz.app
- الحد الأدنى: Android 6.0 (API 23)
- اللعبة محفوظة محليًا داخل `app/src/main/assets/index.html` وتعمل دون إنترنت.
- حفظ التقدم يعتمد على DOM Storage.

يتم بناء APK تلقائيًا عبر GitHub Actions عند تحديث هذا المجلد أو تشغيل Workflow يدويًا. ملف APK الناتج يُرفع كـ Artifact باسم `brain-quiz-debug-apk`.
