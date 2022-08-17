import { ref } from "vue";
import { projectStorage } from "../firebase/config";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const fileUpload = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    console.log(user.value);
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
      error.message = err.message;
    }
  };

  const deleteImage = async (file) => {
    const storageRef = projectStorage.ref(file);
    try {
      await storageRef.delete();
    } catch (err) {
      console.log(err.message);
      error.value = "this image does not delete!";
    }
  };

  return { url, filePath, error, fileUpload, deleteImage };
};

export default useStorage;
