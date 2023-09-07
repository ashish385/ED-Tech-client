import React, { useState } from 'react';
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Skills Paths",
    "Carrer Paths"
]

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0]);
    // console.log(HomePageExplore[0]);
    // console.log(currentCard);

    const setMyCards = (value) => {
        setCurrentTab(value);
        console.log(currentTab);
        const result = HomePageExplore.filter((course) => {
            return course.tag === value;
        });
        console.log("result", result);
        setCourses(result[0].courses);
        console.log("courses", courses);
        setCurrentCard(result[0].courses[0].heading)
        console.log("currentCard", currentCard);
    };
  return (
    <>
      <div className="text-2xl md:text-4xl font-semibold text-start md:text-center">
        Unlock the <HighlightText text={"Power of Code"} />
      </div>
          <p className='text-center text-richblack-300 text-lg font-semibold mt-3'>Learn to Build Anything You Can Imagine</p>
          
          <div className='flex flex-row mt-5 rounded-full shadow shadow-richblack-500 gap-1   bg-richblack-800 mb-8  '>
              {
                  tabsName.map((element, index) => {
                      return (
                        <div
                          className={`text-[16px] flex flex-row items-center 
                           ${
                             currentTab === element
                               ? "bg-richblack-900 text-richblack-5 font-medium"
                               : "text-richblack-200 "
                                  } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-2 py-2 `}
                              key={index}
                              onClick={() => setMyCards(element)}
                        >
                          {element}
                        </div>
                      );
                  })
              }
          </div>

          <div className='h-[350px] md:h-[250px]'></div>

          <div className='absolute -bottom-20 md:-bottom-14 flex flex-col md:flex-row gap-5 justify-between w-full'>
              {
                  courses.map((element, index) => {
                      return (
                        <>
                          <CourseCard
                            key={index}
                            cardData={element}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                          />
                        </>
                      );
                  })
              }
          </div>
    </>
  );
}

export default ExploreMore
