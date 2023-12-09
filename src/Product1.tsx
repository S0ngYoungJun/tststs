import React, { useState, useEffect } from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import { useNavigate } from 'react-router-dom';
import "./Product.scss"

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
  const [hbClickedBoxes, setHbClickedBoxes] = useState([false, false, false, false]);
  const [isBox2Visible, setBox2Visibility] = useState(false);
  const navigate = useNavigate();  // 변경된 부분

  const handleHbClick = (boxNumber : any) => {
    setHbClickedBoxes((prev) => {
      const newState = [...prev];
      newState[boxNumber - 1] = !newState[boxNumber - 1];
      return newState;
    });
  };

  const handleMenuClick = (menuItem: number, boxNumber: number) => {
    // 각 boxNumber에 따라서 적절한 product로 이동
    const getProductNumber = (menuNumber: number) => {
      switch (boxNumber) {
        case 1:
          return menuNumber; // top-bar-1은 product 1,2,3
        case 2:
          return menuNumber + 3; // top-bar-2는 product 4,5,6
        case 3:
          return menuNumber + 6; // top-bar-3은 product 7,8,9
        default:
          return 0; // 예외 처리
      }
    };
  
    navigate(`/product${getProductNumber(menuItem)}`);
  };

  useEffect(() => {
    const handleClickOutside = (event : any) => {
      const target = event.target;
      if (!target.closest('.sub2')) {
        setHbClickedBoxes([false, false, false, false]);
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
  
  const renderMenuContent = (boxNumber : any ) => {
    switch (boxNumber) {
      case 1:
        return [1, 2, 3].map((menuItem) => (
          <div
            key={menuItem}
            className="menu-item"
            onClick={() => handleMenuClick(menuItem , boxNumber)}
          >
            메뉴 항목 {menuItem}
          </div>
        ));
      case 2:
        return [1, 2, 3].map((menuItem) => (
          <div
            key={menuItem}
            className="menu-item"
            onClick={() => handleMenuClick(menuItem , boxNumber)}
          >
            자동차 {menuItem}
          </div>
        ));
      case 3:
        return [1, 2, 3].map((menuItem) => (
          <div
            key={menuItem}
            className="menu-item"
            onClick={() => handleMenuClick(menuItem , boxNumber)}
          >
            우주선 {menuItem}
          </div>
        ));
      // Add more cases for other boxNumbers if needed
      default:
        return null;
    }
  };

  return (
    <div className="box-section">
      <div className="box1">
        <div className="sub1"></div>
        <div className="sub2">
      {[1, 2, 3, 4].map((boxNumber) => (
        <React.Fragment key={boxNumber}>
          <div
            className={`hb${boxNumber} ${hbClickedBoxes[boxNumber - 1] ? 'clicked' : ''}`}
            onClick={() => handleHbClick(boxNumber)}
          >
            {boxTexts[boxNumber - 1]}
          </div>
          {hbClickedBoxes[boxNumber - 1] && (
            <div className={`top-bar bar${boxNumber}`}>
              <div className="menu">
                {renderMenuContent(boxNumber)}
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
        <div className="background-image" style={{ backgroundImage: 'url(/모델S.jpg)' }} />
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
