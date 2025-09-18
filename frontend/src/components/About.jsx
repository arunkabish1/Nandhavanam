import Header from "./Header";

export default function About() {
  return (
    <>
    <Header/>   
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold text-cyan-900">About Nandavanam</h1>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Nandavanam is a community dedicated to promoting the Tamil language
          and culture. Our mission is to create a vibrant space where Tamil
          enthusiasts can connect, share knowledge, and celebrate the rich
          heritage of Tamil Nadu. We offer a variety of resources, events, and
          activities to engage our members and foster a deeper appreciation for
          Tamil traditions.
        </p>
      </div>
    </>
  );
}
