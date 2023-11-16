import { MutableRefObject, useState } from "react";

export const useNavVisible = (ref: MutableRefObject<null | HTMLDivElement>) => {
  const [isVisible, setIsVisible] = useState(true);

  if (ref.current) {
    // check if the element is still in the viewport (visible)
    const observer = new IntersectionObserver((entry) => {
      setIsVisible(entry[0].isIntersecting); // .isIntersecting is a boolean set to false if there's no intersection
    });

    observer.observe(ref.current);
  }

  return isVisible;
};