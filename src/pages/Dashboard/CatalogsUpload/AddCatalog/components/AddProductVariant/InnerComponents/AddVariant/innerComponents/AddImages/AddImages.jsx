import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const AddImages = ({
  register,
  name,
  setValue,
  index,
  watch,
  setError,
  setFileRejectionError
}) => {

  const getBase64 = async (file)=> {
    var reader = new FileReader();
    // console.log(reader.readAsDataURL(file),"renderererere")
    reader.readAsDataURL(file); 
  
    return new Promise((reslove, reject) => {
      reader.onload = () => reslove(reader.result);
      reader.onerror = (error) => reject(error);
    })
  }

// async function testing(accepted){
//   console.log(accepted,"accepted")
//   let abc=[];
//   for (let index = 0; index < accepted.length; index++) {
//     console.log(accepted[index],'-accepted[index]accepted[index]')
//      const a=await getBase64(accepted[index])
//     //  abc.push({'name':'eeeeeee'})
//      abc.push({
//       preview: URL.createObjectURL(accepted[index]),
//       imageName:accepted[index].name,
//       // upFile: accepted[index],  
//       blobUrl:a
//     })
//   }
//   return abc
// }

const onDrop = useCallback(
  async (accepted, fileRejections) => {
    console.log(`addVariant.${index}.file`, "5555555555555555");
    const currentFiles = watch(name) ?? [];
    if (currentFiles.length + accepted.length <= 3) {
      const processedFiles = await Promise.all(
        accepted.map(async (file) => ({
          preview: URL.createObjectURL(file),
          imageName: file.name,
          blobUrl: await getBase64(file),
        }))
      );
      setValue([...currentFiles, ...processedFiles]);
    } else {
      setError(`addVariant.${index}.file`, {
        type: "manual",
        message: "You can upload a maximum of 3 images.",
      });
    }
  },
  [setValue, setError, index, name, watch]
);

  const { getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
        "image/png": [".png"],
      },
      // onDrop: (accepted, fileRejections) => {
      //   console.log(`addVariant.${index}.file`, "5555555555555555");
      //   // if (fileRejections?.length > 0) {
      //   //     setErrrors(fileRejections[0].errors[0].message)
      //   // }
      //   // setValue([
      //   //   ...(watch(name) ?? []),
      //   //   ...accepted.map(
      //   //     (upFile) =>
      //   //       Object.assign(upFile, {
      //   //         preview: URL.createObjectURL(upFile),
      //   //         upFile: upFile[0],
      //   //       })
      //   //   ),
      //   // ]);
   
      //     const currentFiles = watch(name) ?? [];
      //     if (currentFiles.length + accepted.length <= 3) {
      //       testing([...currentFiles,...accepted]).then((ert)=>{
      //         setValue(ert)
      //       })
      //     }
      //     else {
      //       setError(`addVariant.${index}.file`, {
      //         type: "manual",
      //         message: "You can upload a maximum of 3 images.",
      //       });
      //     } 
      // },
      onDrop,
      maxFiles: 3,
      multiple: true,
      maxSize: 5 * 1024 * 1024,
    });

  return (
  

      <div {...getRootProps()}>
        <input
          type="file"
          id={`fileInput${index}`}
          // name={`${[list.id]}.file`}
          {...register(`addVariant.${index}.file`)}
          // name={`main.${index}.file`}
          style={{ display: "none" }}
          {...getInputProps()}
        />
      </div>
    
  );
};

export default React.memo(AddImages);
