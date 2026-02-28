import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16 max-w-3xl">
      <section className="mb-12 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-serif">
          About musa Jeju
        </h1>
        <p className="text-xl text-gray-600 font-serif italic">
          "무사마씸? (무슨 일입니까?)"
        </p>
      </section>

      <div className="prose prose-lg prose-gray mx-auto">
        <p>
          안녕하세요. <strong>musa Jeju (무사마씸 제주)</strong>에 오신 것을 환영합니다.
        </p>
        <p>
          '무사마씸'은 제주 방언으로 "무슨 일입니까?" 또는 "왜 그러십니까?"라는 뜻을 담고 있습니다. 
          저희는 제주에서 일어나는 모든 일, 맛있는 음식, 아름다운 풍경, 그리고 사람들의 이야기를 기록합니다.
        </p>
        <p>
          화려한 관광지뿐만 아니라, 현지인들만 아는 숨은 명소와 소박한 일상의 순간들을 공유하며 
          진정한 제주의 매력을 전달하고자 합니다.
        </p>
        
        <hr className="my-8" />

        <h3>Contact</h3>
        <p>
          제주와 관련된 이야기나 제휴 문의는 언제든지 환영합니다.
        </p>
        <ul>
          <li>Email: contact@musajeju.com</li>
          <li>Instagram: @musa_jeju</li>
        </ul>
      </div>
    </div>
  );
}
