document.addEventListener('DOMContentLoaded', () => {
    // العناصر الأساسية
    const chatToggle = document.getElementById('chatToggle');
    const chatbox = document.getElementById('chatbox');
    const closeChat = document.getElementById('closeChat');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');

    // التأكد من وجود العناصر
    if (!chatToggle || !chatbox) {
        console.error('عناصر الدردشة غير موجودة');
        return;
    }

    // فتح/إغلاق الدردشة
    function toggleChat() {
        console.log('تم النقر على زر الدردشة');
        if (chatbox.classList.contains('hidden')) {
            chatbox.classList.remove('hidden');
            chatbox.classList.add('visible');
        } else {
            chatbox.classList.add('hidden');
            chatbox.classList.remove('visible');
        }
    }

    // إضافة مستمعي الأحداث
    chatToggle.addEventListener('click', toggleChat);
    
    closeChat.addEventListener('click', () => {
        chatbox.classList.add('hidden');
        chatbox.classList.remove('visible');
    });

    // منع فقاعة الحدث
    chatbox.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // إغلاق عند النقر خارج الدردشة
    document.addEventListener('click', (e) => {
        if (!chatbox.contains(e.target) && !chatToggle.contains(e.target)) {
            chatbox.classList.add('hidden');
            chatbox.classList.remove('visible');
        }
    });

    // طباعة للتأكد من تحميل الكود
    console.log('تم تحميل كود الدردشة');
}); 