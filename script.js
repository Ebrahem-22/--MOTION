// الحصول على العناصر
const modal = document.getElementById('registerModal');
const btn = document.getElementById('registerBtn');
const closeBtn = document.getElementsByClassName('close-button')[0];
let countdownInterval;

// فتح النافذة المنبثقة عند الضغط على زر التسجيل
btn.onclick = function() {
    modal.style.display = "block";
    startCountdown();
}

// إغلاق النافذة المنبثقة عند الضغط على X
closeBtn.onclick = function() {
    modal.style.display = "none";
    clearInterval(countdownInterval);
}

// إغلاق النافذة المنبثقة عند النقر خارجها
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        clearInterval(countdownInterval);
    }
}

// العد التنازلي والتحويل
function startCountdown() {
    let count = 5;
    const countdownElement = document.getElementById('countdown');
    
    countdownInterval = setInterval(() => {
        countdownElement.textContent = count;
        count--;
        
        if (count < 0) {
            clearInterval(countdownInterval);
            window.location.href = "register.html";
        }
    }, 1000);
}

// إضافة دوال التحكم في القائمة المنسدلة للمستخدم
function openUserMenu() {
    const userMenu = document.createElement('div');
    userMenu.className = 'user-menu';
    userMenu.innerHTML = `
        <div class="user-menu-content">
            <a href="/profile" class="menu-item">
                <i class="fas fa-user"></i>
                الملف الشخصي
            </a>
            <a href="/settings" class="menu-item">
                <i class="fas fa-cog"></i>
                الإعدادات
            </a>
            <button onclick="signOut()" class="menu-item sign-out">
                <i class="fas fa-sign-out-alt"></i>
                تسجيل الخروج
            </button>
        </div>
    `;
    
    document.body.appendChild(userMenu);
    
    // إغلاق القائمة عند النقر خارجها
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!userMenu.contains(e.target)) {
                userMenu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 0);
}

async function signOut() {
    try {
        await clerk.signOut();
        window.location.href = '/';
    } catch (error) {
        console.error('Error signing out:', error);
    }
}

function startTransition(url) {
    // تفعيل شاشة الانتقال
    const transitionScreen = document.querySelector('.transition-screen');
    transitionScreen.classList.add('active');
    
    // تحديث نص الانتقال
    document.querySelector('.transition-text').textContent = 'جاري تحويلك إلى صفحة تسجيل الدخول';
    
    // تأخير التحويل للسماح بعرض الانيميشن
    setTimeout(() => {
        window.location.href = 'https://EbrahemGroupe.nzmly.com';
    }, 2000);
}

// إضافة تأثير ripple عند النقر على الأزرار
document.querySelectorAll('.nav-cta, .cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
});

// تحسين تحميل الصفحة
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// WhatsApp Button Interactions
document.addEventListener('DOMContentLoaded', () => {
    const whatsappButton = document.querySelector('.whatsapp-link');
    
    // إضافة تأثير الضغط
    whatsappButton.addEventListener('mousedown', () => {
        whatsappButton.style.transform = 'scale(0.95) translateY(-5px)';
    });

    whatsappButton.addEventListener('mouseup', () => {
        whatsappButton.style.transform = 'scale(1) translateY(-5px)';
    });

    // تتبع عدد النقرات على زر الواتساب
    whatsappButton.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'event_category': 'Contact',
                'event_label': 'WhatsApp Button Click'
            });
        }
    });
}); 