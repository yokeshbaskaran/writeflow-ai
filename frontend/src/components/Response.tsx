import { useState } from "react";
import { BiCopy } from "react-icons/bi";
import { MdDone } from "react-icons/md";
const Response = () => {
  const [textCopied, setTextCopied] = useState(false);
  return (
    <>
      {/* Response section */}
      <section className="w-full py-2 px-1 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-primary font-semibold">
            AI Generated Response
          </h2>
        </div>

        <div className="relative">
          <article className="flex-1 h-100 mt-4 px-3 py-5 text-sm text-justify border border-border-strong rounded md:max-h-100 overflow-y-auto scrollbar-thin">
            {/* Dummy text  */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            modi, eius explicabo itaque eos deleniti amet quia dolor sunt
            adipisci illo, veniam corporis suscipit tempora nam commodi,
            reiciendis perspiciatis qui. Distinctio magni exercitationem
            consequatur repellat commodi officia, libero, praesentium, quisquam
            rerum itaque quod impedit debitis quaerat earum dolor iusto in et
            labore aspernatur reprehenderit sequi non eos. Asperiores, ipsa
            rerum? Blanditiis, beatae minima iusto architecto officia
            perferendis. Molestias sed ipsum officia nobis harum distinctio eius
            totam saepe. Corrupti blanditiis iusto, nobis, aperiam voluptatem
            nulla, rem beatae ad ipsum saepe nesciunt. Sit rem magnam nisi
            asperiores maiores hic ad quas amet expedita vel, quibusdam nemo
            quis excepturi mollitia temporibus, voluptatum ipsam velit. Aliquid
            ad culpa ipsam ullam asperiores? Alias nostrum ipsa numquam corrupti
            vel error quisquam deserunt quas a, incidunt nobis. Liba ipsam ullam
            asperiores? Alias nostrum ipsa numquam corrupti vel error quisquam
            deserunt quas a, incidunt nobis. Libero deserunt et animi tempora
            labore! Debitis quis, optio a ut alias consequatur recusandae quos
            necessitatibus ratione?
          </article>

          <div className="mt-6 mx-5 absolute top-0 right-0">
            <button className="p-1 bg-bg text-primary border border-border rounded hover:text-white hover:bg-primary cursor-pointer">
              {textCopied ? <MdDone size={23} /> : <BiCopy size={23} />}
            </button>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-text-muted">600 words</span>
        </div>
      </section>
    </>
  );
};

export default Response;
