import { FiFile, FiImage, FiVideo } from "react-icons/fi";
import { AiOutlineFilePdf, AiOutlineFileZip } from "react-icons/ai";

export default function TypeIdentifier({ fileType }) {
  switch (fileType) {
    // Images
    case "jpeg":
      return <FiImage />;
    case "jpg":
      return <FiImage />;
    case "png":
      return <FiImage />;
    case "webp":
      return <FiImage />;
    case "gif":
      return <FiImage />;

    // Videos
    case "mp4":
      return <FiVideo />;
    case "flv":
      return <FiVideo />;
    case "webm":
      return <FiVideo />;
    case "3gp":
      return <FiVideo />;

    //Others
    case "pdf":
      return <AiOutlineFilePdf />;
    case "zip":
      return <AiOutlineFileZip />;
    case "rar":
      return <AiOutlineFileZip />;

    default:
      return <FiFile />;
  }
}
