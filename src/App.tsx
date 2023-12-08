// MainPage 컴포넌트를 추가하고 내보내는 부분이 누락되어 있습니다.
// MainPage.tsx

import React, { useState, useEffect } from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import { useNavigate } from 'react-router-dom';
import "./App.scss"

const options = {
  activeClass: 'active',
  anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour'],
  arrowNavigation: true,
  className: 'SectionContainer',
  delay: 1000,
  navigation: true,
  scrollBar: false,
  sectionClassName: 'Section',
  sectionPaddingTop: '0',
  sectionPaddingBottom: '0',
  verticalAlign: false,
};
const boxTexts = ["차량", "부속품", "충전", "고객센터"];
const BoxSection = () => {
  const [clickedBox, setClickedBox] = useState<number | null>(null);
  const [isBox2Visible, setBox2Visibility] = useState(false);
  const navigate = useNavigate();  // 변경된 부분

  const handleClick = (boxNumber: number) => {
    setClickedBox((prevClickedBox) => (prevClickedBox === boxNumber ? null : boxNumber));
  };

  const handleMenuClick = (boxNumber: number) => {
    // top-bar의 메뉴를 클릭할 때 페이지 이동
    navigate(`/product${boxNumber}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.sub2')) {
        // .sub2 영역 외의 부분을 클릭했을 때 clickedBox 초기화
        setClickedBox(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // 페이지가 로드될 때 1초 후에 visible 클래스 추가
    const timer = setTimeout(() => {
      setBox2Visibility(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  

  return (
    <div className="box-section">
      <div className="box1">
        <div className="sub1"></div>
        <div className="sub2">
          {[1, 2, 3, 4].map((boxNumber) => (
            <React.Fragment key={boxNumber}>
              <div
                className={`hb${boxNumber} ${clickedBox === boxNumber ? 'clicked' : ''}`}
                onClick={() => handleClick(boxNumber)}
              >
                {boxTexts[boxNumber - 1]}
              </div>
              {clickedBox === boxNumber && (
                <div className={`top-bar bar${boxNumber}`}>
                  <div className="menu">
                    {[1, 2, 3].map((menuItem) => (
                      <div
                        key={menuItem}
                        className="menu-item"
                        onClick={() => handleMenuClick(menuItem)}
                      >
                        메뉴 항목 {menuItem}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="sub3"></div>

      </div>
      <div className={`box2 ${isBox2Visible ? 'visible' : ''}`}>NTS</div>
      <div className="box3">시승 신청하기</div>
      
    </div>
  );
};

const MainPage = () => {
  
  return (
    <SectionsContainer {...options}>
      <Section>
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
        <BoxSection />
      </Section>
      <Section>
        <div className="background-image" style={{ backgroundImage: 'url(/image1.jpg)' }} />
        <BoxSection />
      </Section>
      <Section>
        <div className="background-image" style={{ backgroundImage: 'url(/image2.jpg)' }} />
        <BoxSection />
      </Section>
      <Section>
        <div className="background-image" style={{ backgroundImage: 'url(/image3.jpg)' }} />
        <BoxSection />
      </Section>
    </SectionsContainer>
  );
};

export default MainPage;
