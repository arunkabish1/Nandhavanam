import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import logo from '../assets/logo.png'
import image from '../assets/image.png'
export const HoverImageLinks = () => {
  return (
    <section className="bg-neutral-950 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          heading="About"
          subheading="Know what we do here"
          imgSrc={logo}
          href="/about"
        />
        <Link
          heading="Members"
          subheading="We work with great people"
          imgSrc="https://scontent.fmaa2-2.fna.fbcdn.net/v/t1.6435-9/55649770_2211823662403487_6317640375494246400_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=RpFFcrz_08wQ7kNvwEON8Lu&_nc_oc=Admm_2TcLo6b5TzkxS8bWCsq5aIdMA-vQxFbyJ5DYgFqH-zAepasSkuMs1GQ1X_WsR21MetiBFiHs-IoMqE5Ws7U&_nc_zt=23&_nc_ht=scontent.fmaa2-2.fna&_nc_gid=u71NLNeC1miFIxfz1yrVtg&oh=00_AfjWhc8a8XXanOZts8eSK4p7M1SSWk20EQ2Li8M3xLqxbg&oe=693161FE"
          href="/gallery"
        />
        <Link
          heading="Admissions"
          subheading="Our work speaks for itself"
          imgSrc="https://scontent.fmaa2-2.fna.fbcdn.net/v/t39.30808-6/545766409_3984595488459620_2458843004921002685_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=bF_R9chY97wQ7kNvwHTXlIA&_nc_oc=AdlfIlNZMaT27TTOWx08raV5hiB7wjDvYMH3rSV3OfHgOBrr87XuK1drAFh4GpAzGLZjS-R5s-kXN27K0OZkMafO&_nc_zt=23&_nc_ht=scontent.fmaa2-2.fna&_nc_gid=aesMmSM3SnRZhYnkD7IGCw&oh=00_AfjZFWTbVjgCJS7kdT1C1lJMdtFOf3gkXIcNWZBID3uH2Q&oe=690FAC08"
          href="/admission"
        />
        <Link
          heading="Contact"
          subheading="We want cool people"
          imgSrc={image}
          href="/contact"
        />
        <Link
          heading="Events"
          subheading="Incase you're bored"
          imgSrc="https://scontent.fmaa2-1.fna.fbcdn.net/v/t39.30808-6/502681634_3890807697838400_1828521536295120010_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=KDSKbHG01loQ7kNvwGISN_T&_nc_oc=Adli0C0gdfeeE-IJI32oS_K8zsdpu7DNYB8Tpr8xu7VnFn-DSrJsVZmzi23CtDHosD7Xc8EZqAGTyFIk8J9_it7v&_nc_zt=23&_nc_ht=scontent.fmaa2-1.fna&_nc_gid=KZCmPKhxxcCfrTIrLaQDgA&oh=00_Afgc0mLR6T-lTbxUseUT7IZRfU1Y4Ric4Nubr34JJaktwA&oe=690FCF9D"
          href="#"
        />
      </div>
    </section>
  );
};

const Link = ({ heading, imgSrc, subheading, href }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className="text-5xl text-neutral-50" />
      </motion.div>
    </motion.a>
  );
};