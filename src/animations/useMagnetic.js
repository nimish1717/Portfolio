import { useEffect, useRef } from 'react';
import gsap from 'gsap';
export const useMagnetic = () => {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el)
            return;
        const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = el.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            // limit magnetic area
            if (Math.abs(x) < width * 2 && Math.abs(y) < height * 2) {
                xTo(x * 0.3);
                yTo(y * 0.3);
            }
            else {
                xTo(0);
                yTo(0);
            }
        };
        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };
        window.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);
    return ref;
};
