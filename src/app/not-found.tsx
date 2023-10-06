import Image from "next/image";
import notFoundImg from "./../assets/not-found.png";

const NotFoundPage = () => {
  return (
    <div>
      <Image
        src={notFoundImg}
        alt="page not found"
        sizes="30vw"
        style={{
          width: "100%",
          height: "100vh",
        }}
      />
    </div>
  );
};

export default NotFoundPage;
