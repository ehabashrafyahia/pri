import React from 'react';

const CityCard = ({ name, desc, className = '' }: { name: string, desc: string, className?: string }) => (
  <div className={`bg-white p-6 rounded-xl border-2 border-purple-100 shadow-md transition-transform hover:-translate-y-1 duration-300 ${className}`}>
    <h3 className="text-3xl font-black text-purple-900 mb-3">{name}</h3>
    <p className="text-2xl text-slate-800 font-amiri leading-relaxed">{desc}</p>
  </div>
);

export default function Infographic() {
  return (
    <div dir="rtl" className="font-cairo w-full flex justify-center py-8 px-4">
      <div 
        className="w-full max-w-[210mm] bg-slate-800 shadow-2xl relative overflow-hidden flex flex-col rounded-xl" 
        style={{ minHeight: '297mm' }}
      >
        {/* Header */}
        <header className="bg-purple-900 text-white text-center py-16 px-8 border-b-8 border-yellow-500 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight relative z-10 drop-shadow-lg">الحضارة الفينيقية</h1>
          <p className="text-3xl md:text-4xl font-bold text-yellow-400 relative z-10">إعداد: أ. إيهاب أشرف</p>
        </header>
        
        {/* Content */}
        <div className="p-8 md:p-12 flex-1 flex flex-col gap-10 bg-slate-800">
          {/* Section 1 */}
          <section className="bg-amber-50 rounded-2xl p-8 md:p-10 shadow-xl border-t-8 border-purple-900 relative">
            <h2 className="text-4xl md:text-5xl font-black text-blue-950 mb-6 border-b-4 border-yellow-500 pb-3 inline-block">نشأة الحضارة وموقعها</h2>
            <p className="text-3xl text-slate-800 leading-relaxed font-amiri">
              استقر الفينيقيون على الشريط الساحلي لسوريا ولبنان وفلسطين على البحر المتوسط، ويُعدّون أول أمة بحرية في العالم.<br/><br/>
              أطلق عليهم الإغريق اسم "فينكس" أي الشعب الأحمر اللون نسبة إلى الصبغة الأرجوانية التي استخرجوها من القواقع البحرية، ومنها اشتُق اسم فينيقيا أي الأرض الحمراء اللون.
            </p>
          </section>
          
          {/* Section 2 */}
          <section className="bg-amber-50 rounded-2xl p-8 md:p-10 shadow-xl border-t-8 border-purple-900">
            <h2 className="text-4xl md:text-5xl font-black text-blue-950 mb-8 border-b-4 border-yellow-500 pb-3 inline-block">أشهر المدن الفينيقية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CityCard name="صيدا" desc="احتلت مركز الزعامة بين المدن الفينيقية." />
              <CityCard name="أوغاريت" desc="اشتهرت بالفن والعمارة وكانت ميناءً تجارياً هاماً." />
              <CityCard name="صور" desc="تولت الزعامة بعد صيدا وتميزت بسورها العظيم الذي حماها من الغزاة." />
              <CityCard name="جبيل" desc="أقدم المدن وأوثقها صلة بمصر القديمة، وعُثر فيها على أقدم أبجدية." />
              <CityCard name="قرطاجة" desc="أسسها الفينيقيون قرب تونس ونافست المدن الفينيقية في التجارة." className="md:col-span-2 text-center" />
            </div>
          </section>
          
          {/* Section 3 */}
          <section className="bg-amber-50 rounded-2xl p-8 md:p-10 shadow-xl border-t-8 border-purple-900">
            <h2 className="text-4xl md:text-5xl font-black text-blue-950 mb-8 border-b-4 border-yellow-500 pb-3 inline-block">مظاهر الحضارة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-3xl font-black text-purple-900 mb-4 border-r-4 border-yellow-500 pr-3">الحياة الاقتصادية:</h3>
                <ul className="list-disc list-inside text-2xl text-slate-800 font-amiri space-y-3">
                  <li>تحويل سفوح جبال لبنان إلى مساطب.</li>
                  <li>زراعة الحبوب والزيتون والعنب والنخيل.</li>
                  <li>إدخال الرمان إلى شمال أفريقيا.</li>
                  <li>صناعة النسيج الأرجواني والزجاج والفخار.</li>
                  <li>السيطرة على التجارة البحرية والبرية.</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-3xl font-black text-purple-900 mb-4 border-r-4 border-yellow-500 pr-3">الحياة السياسية:</h3>
                <ul className="list-disc list-inside text-2xl text-slate-800 font-amiri space-y-3">
                  <li>مدن مستقلة.</li>
                  <li>نظام شبه ديمقراطي.</li>
                  <li>ملك مقيدة سلطته.</li>
                  <li>مجلس شيوخ ومجلس نواب.</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-3xl font-black text-purple-900 mb-4 border-r-4 border-yellow-500 pr-3">الحياة الدينية:</h3>
                <ul className="list-disc list-inside text-2xl text-slate-800 font-amiri space-y-3">
                  <li>إيل</li>
                  <li>بعل</li>
                  <li>عشتار</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-3xl font-black text-purple-900 mb-4 border-r-4 border-yellow-500 pr-3">الحياة الاجتماعية:</h3>
                <ul className="list-disc list-inside text-2xl text-slate-800 font-amiri space-y-3">
                  <li>طبقة عليا</li>
                  <li>طبقة وسطى</li>
                  <li>طبقة دنيا</li>
                </ul>
              </div>
              <div className="md:col-span-2 bg-purple-50 p-6 rounded-xl border border-purple-200 shadow-sm">
                <h3 className="text-3xl font-black text-purple-900 mb-4 border-r-4 border-yellow-500 pr-3">الحياة الثقافية:</h3>
                <ul className="list-disc list-inside text-2xl text-slate-800 font-amiri space-y-3">
                  <li>أول أبجدية في العالم (22 حرفًا – القرن 14 ق.م).</li>
                  <li>نقلها الإغريق ثم الرومان.</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* Section 4 & 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section className="bg-amber-50 rounded-2xl p-8 shadow-xl border-t-8 border-purple-900 flex flex-col">
              <h2 className="text-4xl font-black text-blue-950 mb-6 border-b-4 border-yellow-500 pb-3 inline-block self-start">التواصل مع مصر القديمة</h2>
              <ul className="list-disc list-inside text-2xl text-slate-800 font-amiri space-y-4">
                <li>سنفرو واستيراد خشب الأرز.</li>
                <li>نخاو والدوران حول أفريقيا.</li>
                <li>سوريا ولبنان خط دفاع أول.</li>
                <li>التأثر بعادات الدفن المصرية.</li>
              </ul>
            </section>
            
            <section className="bg-amber-50 rounded-2xl p-8 shadow-xl border-t-8 border-purple-900 flex flex-col">
              <h2 className="text-4xl font-black text-blue-950 mb-6 border-b-4 border-yellow-500 pb-3 inline-block self-start">سقوط فينيقيا</h2>
              <ul className="list-disc list-inside text-2xl text-slate-800 font-amiri space-y-4">
                <li>نبوخذ نصر الثاني.</li>
                <li>الفرس.</li>
                <li>الإسكندر الأكبر.</li>
                <li>السلوقيون.</li>
                <li>الرومان.</li>
                <li>دخول الجيوش الإسلامية 634م.</li>
              </ul>
            </section>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-purple-900 text-white text-center py-10 px-8 border-t-8 border-yellow-500 mt-auto relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <p className="text-5xl font-black mb-3 relative z-10">أ. إيهاب أشرف</p>
          <p className="text-3xl text-yellow-400 font-bold relative z-10">مدرس الدراسات الاجتماعية</p>
        </footer>
      </div>
    </div>
  );
}
