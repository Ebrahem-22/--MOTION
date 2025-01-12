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