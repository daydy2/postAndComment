import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const ImagePicker = (props) => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const changeHandler = (e) => {
    const file = e.target.files[0];

    if (!file.type.match(imageMimeType)) {
      alert("Invalid Image");
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();

      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <Pick>
      <form className="imagePicker__form">
        <label htmlFor="image" className="imagePicker__label">
          {props.children}

          <input
            type="file"
            id="image"
            accept=".png, .jpg, .jpeg"
            onChange={changeHandler}
            className="imagePicker__input"
          />

          {fileDataURL ? (
            <p className="imagePicker__p-previewer">
              {<img src={fileDataURL} alt="preview" />}
            </p>
          ) : null}
        </label>

        {/* <p>
            <input type="submit" label="Upload" />
            </p> */}
      </form>
    </Pick>
  );
};
const Pick = styled.main`
  .imagePicker {
    &__form {
      margin: 10px 0;
    }
    &__input {
      display: none;
    }
    &__label {
      display: block;
      width: 136px;
      height: 136px;
      background: $accent;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px dashed #974444;
      border-radius: 16px;
      position: relative;
    }
    &__p-previewer {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      & img {
        width: 95%;
        height: 90%;
        border-radius: 16px;
        object-fit: cover;
      }
    }
  }
`;

export default ImagePicker;
