document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const loading = showLoading('جاري التسجيل...');
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('password').value
        };

        // التحقق من صحة البيانات
        if (!formData.email.includes('@')) {
            throw new Error('يرجى إدخال بريد إلكتروني صحيح');
        }

        if (formData.password.length < 8) {
            throw new Error('يجب أن تكون كلمة المرور 8 أحرف على الأقل');
        }

        const response = await signUp(formData);
        
        if (response.status === 'complete') {
            showSuccess('تم التسجيل بنجاح! جاري تحويلك...');
            // حفظ بيانات المستخدم في localStorage إذا لزم الأمر
            localStorage.setItem('userEmail', formData.email);
            
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 2000);
        } else if (response.status === 'needs_verification') {
            showInfo('تم إرسال رابط التأكيد إلى بريدك الإلكتروني');
        }
    } catch (error) {
        showError(getErrorMessage(error));
    } finally {
        hideLoading();
    }
});

// دالة لترجمة رسائل الخطأ
function getErrorMessage(error) {
    const errorMessages = {
        'email_already_exists': 'البريد الإلكتروني مستخدم بالفعل',
        'invalid_email': 'البريد الإلكتروني غير صحيح',
        'invalid_password': 'كلمة المرور غير صالحة',
        'network_error': 'خطأ في الاتصال بالخادم'
    };

    return errorMessages[error.code] || error.message || 'حدث خطأ غير متوقع';
}

// دوال مساعدة لعرض الرسائل
function showLoading(message) {
    // إضافة مؤشر تحميل
}

function hideLoading() {
    // إخفاء مؤشر التحميل
}

function showSuccess(message) {
    // عرض رسالة نجاح
}

function showError(message) {
    // عرض رسالة خطأ
}

function showInfo(message) {
    // عرض رسالة معلومات
} 