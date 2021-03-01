import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

import "./EditProject.css";
import { Modal, useModalContext } from "../../context/Modal";
import {
  updateProject,
  getProjectById,
  deleteImage,
} from "../../store/project";

const EditProjectForm = () => {
  const dispatch = useDispatch();

  const projectId = useSelector((state) => state.project.currentProject.id);
  const project = useSelector((state) => state.project.currentProject);
  const currentProject = useSelector((state) => state.project.currentProject);

  const { setShowEditProjectModal } = useModalContext();

  const [name, setName] = useState(currentProject.name);
  const [description, setDescription] = useState(currentProject.description);
  const [goalAmount, setGoalAmount] = useState(currentProject.goalAmount);
  const [minPledge, setMinPledge] = useState(currentProject.minPledge);
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [images, setAdditionalImages] = useState([]);
  const [deleteImageList, setDeleteImageList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (project) {
      setImageList(project.images);
    }
  }, [project]);

  const editDonation = async (e) => {
    e.preventDefault();
    const donation = await dispatch(
      updateProject(
        projectId,
        name,
        description,
        goalAmount,
        minPledge,
        thumbnailImage,
        images
      )
    );
    if (!donation.errors) {
      setShowEditProjectModal(false);
      deleteImageList.forEach((id) => {
        dispatch(deleteImage(id));
      });
      dispatch(getProjectById(projectId));
    } else {
      setErrors(donation.errors);
    }
  };

  const deleteImageById = (id) => {
    setDeleteImageList((prev) => [...prev, id]);
    setImageList((prev) => prev.filter((image) => image.id !== id));
  };

  const deleteImageByName = (name) => {
    let result = [];
    images.forEach((Filelist) => {
      let file = Filelist;
      let newFile = [];
      for (let key in file) {
        let number = Number(key);
        if (number || number === 0) {
          if (file[key].name !== name) {
            newFile.push(file[key]);
          }
        }
      }
      result.push(newFile);
    });
    setAdditionalImages(result);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateGoalAmount = (e) => {
    setGoalAmount(e.target.value);
  };

  const updateMinPledge = (e) => {
    setMinPledge(e.target.value);
  };

  const chooseImage = () => {
    document.getElementById("file").click();
  };

  const chooseAdditionalImage = () => {
    document.getElementById("additionalFile").click();
  };

  const updateThumbnailImage = (e) => {
    const file = e.target.files[0];

    if (file) setThumbnailImage(file);
  };

  const updateAdditionalImages = (e) => {
    const file = e.target.files;
    if (file) setAdditionalImages((prev) => [...prev, file]);
  };

  return (
    <>
      <Modal onClose={() => setShowEditProjectModal(false)}>
        <div className="editProject-container">
          <h1>Update Your Story</h1>
          <form onSubmit={editDonation} className="update-form">
            <div>
              {errors.map((error, idx) => (
                <ul className="errors" key={idx}>
                  {error}
                </ul>
              ))}
            </div>
            <div>
              <input
                type="text"
                className="editProject-textArea"
                name="name"
                value={name}
                onChange={updateName}
                required
              ></input>
            </div>
            <div>
              <input
                className="chooseImage-button"
                type="button"
                id="loadFile"
                value="New Thumbnail Image"
                onClick={chooseImage}
              />
              <label for="image"> {thumbnailImage.name}</label>
              <input
                className="hide-this-button"
                placeholder="Choose a Thumbnail Image"
                id="file"
                type="file"
                name="image"
                onChange={updateThumbnailImage}
              />
            </div>
            <div>
              <textarea
                type="text"
                className="input-text"
                rows="10"
                name="description"
                value={description}
                onChange={updateDescription}
                required
              ></textarea>
            </div>
            <div>
              {project &&
                imageList.map((img, idx) => (
                  <div>
                    <span>
                      <span
                        onClick={() => deleteImageById(img.id)}
                        className="delete-image-div"
                      >
                        <DeleteIcon />
                      </span>
                    </span>
                    {img.imageUrl.split(".s3.amazonaws.com/")[1]}
                  </div>
                ))}
              {images &&
                images.map((fileList) =>
                  Array.from(fileList).map((image) => (
                    <div>
                      <span>
                        <span
                          onClick={() => deleteImageByName(image.name)}
                          className="delete-image-div"
                        >
                          <DeleteIcon />
                        </span>
                      </span>
                      {image.name}
                    </div>
                  ))
                )}
              <input
                className="chooseAdditionalImage-button"
                type="button"
                id="loadFile"
                value="Choose a Additional Images"
                onClick={chooseAdditionalImage}
              />
              <input
                className="hide-this-button"
                placeholder="Choose a Thumbnail Image"
                multiple="true"
                id="additionalFile"
                type="file"
                name="image"
                onChange={updateAdditionalImages}
              />
            </div>
            <div>
              <input
                type="number"
                className="input-text"
                name="goal"
                value={goalAmount}
                onChange={updateGoalAmount}
              ></input>
            </div>
            <div>
              <input
                type="number"
                className="input-number"
                name="minimum"
                value={minPledge}
                onChange={updateMinPledge}
              ></input>
            </div>
            <button
              className="updateProjectSubmit-button"
              type="submit"
              onClick={editDonation}
            >
              Update
            </button>
            <button
              className="updateProjectCancel-button"
              type="submit"
              onClick={() => setShowEditProjectModal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditProjectForm;
