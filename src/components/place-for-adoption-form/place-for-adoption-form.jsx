import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { storage } from "../../firebase.utils";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import FormInput from "../form-input/form-input";
import Button from "../button/button";

import { addPet, getbreeds } from "../../redux/pet-data/pet-data.actions";
import { updateUser } from "../../redux/user/user.actions";

import "./place-for-adoption-form.styles.scss";

const PlaceForAdoptionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [error, setError] = useState({});
  const [breeds, setBreeds] = useState(["Select a breed"]);
  const [images, setImages] = useState([]);
  const [itemInformation, setItemInformation] = useState({
    name: "",
    species: "",
    age: "",
    gender: "",
    size: "",
    breed: "",
    description: "",
    url: "",
    contact: {
      userId: currentUser._id,
      email: currentUser.email,
      phone: currentUser.phone,
    },
    photos: [],
  });

  const { name, species, age, gender, size, breed, description } =
    itemInformation;

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!name) {
      isValid = false;
      errors["name"] = "Please enter the name.";
    }

    if (typeof name !== "undefined") {
      if (name.length > 20) {
        isValid = false;
        errors["name"] = "Name cannot exceed 20 characters.";
      }
    }

    if (age === "") {
      isValid = false;
      errors["age"] = "Please select the age.";
    }

    if (gender === "") {
      isValid = false;
      errors["gender"] = "Please select the gender.";
    }

    if (size === "") {
      isValid = false;
      errors["size"] = "Please select the size.";
    }

    if (species === "") {
      isValid = false;
      errors["species"] = "Please select the species.";
    }

    if (!description) {
      isValid = false;
      errors["description"] = "Please enter a description";
    }

    if (!breed) {
      isValid = false;
      errors["breed"] = "Please select a breed.";
    }

    if (images.length === 0) {
      isValid = false;
      errors["images"] = "Please upload at least one photo of your pet.";
    }

    setError(errors);

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      let uploads = [];
      let urlFetches = [];

      images.forEach((image) => {
        const uuid = v4();
        const imageRef = ref(storage, `images/${uuid}`);
        uploads.push(
          uploadBytes(imageRef, image).then((res) => {
            urlFetches.push(
              getDownloadURL(imageRef).then((res) => {
                setItemInformation({
                  ...itemInformation,
                  photos: itemInformation.photos.push(res),
                });
              })
            );
          })
        );
      });

      Promise.all(uploads).then(() => {
        Promise.all(urlFetches).then(async () => {
          try {
            const postedItem = await addPet(dispatch, itemInformation);
            updateUser(dispatch, {
              ...currentUser,
              postedItems: [...currentUser.postedItems, postedItem._id],
            });
            navigate("/profile", { replace: true });
          } catch (error) {
            alert(error);
          }
        });
      });
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setItemInformation({ ...itemInformation, [name]: value });

    // if there is a change in species, reload the breeds list
    if (name === "species") {
      const response = await getbreeds(value);
      setBreeds(response);
    }
  };

  const fileHandler = (event) => {
    setImages([...event.target.files]);
  };

  return (
    <div className="wd-place-for-adoption">
      <h1>PLACE FOR ADOPTION</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          label="Name"
          error={error.name}
        />
        <div className="wd-radio-buttons">
          <h3>Species</h3>
          <div>
            <input
              type="radio"
              name="species"
              value="cat"
              onChange={handleChange}
              error={error.species}
            />
            Cat
          </div>
          <div>
            <input
              type="radio"
              name="species"
              value="dog"
              onChange={handleChange}
              error={error.species}
            />
            Dog
          </div>
          <div className="wd-warning">{error.species}</div>
          <h3>Age</h3>
          <div>
            <input
              type="radio"
              name="age"
              value="baby"
              onChange={handleChange}
              error={error.age}
            />
            Baby
          </div>
          <div>
            <input
              type="radio"
              name="age"
              value="young"
              onChange={handleChange}
              error={error.age}
            />
            Young
          </div>
          <div>
            <input
              type="radio"
              name="age"
              value="adult"
              onChange={handleChange}
              error={error.age}
            />
            Adult
          </div>
          <div>
            <input
              type="radio"
              name="age"
              value="senior"
              onChange={handleChange}
              error={error.age}
            />
            Senior
          </div>
          <div className="wd-warning">{error.age}</div>
          <h3>Gender</h3>
          <div>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
              error={error.gender}
            />
            Male
          </div>
          <div>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
              error={error.gender}
            />
            Female
          </div>
          <div>
            <input
              type="radio"
              name="gender"
              value="unknown"
              onChange={handleChange}
              error={error.gender}
            />
            Unknown
          </div>
          <div className="wd-warning">{error.gender}</div>
          <h3>Size</h3>
          <div>
            <input
              type="radio"
              name="size"
              value="small"
              onChange={handleChange}
              error={error.size}
            />
            Small
          </div>
          <div>
            <input
              type="radio"
              name="size"
              value="medium"
              onChange={handleChange}
              error={error.size}
            />
            Medium
          </div>
          <div>
            <input
              type="radio"
              name="size"
              value="large"
              onChange={handleChange}
              error={error.size}
            />
            Large
          </div>
          <div>
            <input
              type="radio"
              name="size"
              value="xlarge"
              onChange={handleChange}
              error={error.size}
            />
            XLarge
          </div>
          <div className="wd-warning">{error.size}</div>
        </div>
        <FormInput
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
          label="Description"
          error={error.description}
        />
        <select className="wd-dropdown" name="breed" onChange={handleChange}>
          {breeds.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {images.length > 0
          ? images.forEach((image) => <img src={image} alt="uploaded file" />)
          : ""}
        <input type="file" multiple onChange={(event) => fileHandler(event)} />
        <div className="wd-warning">{error.images}</div>
        <Button onClick={handleSubmit}>CONFIRM</Button>
      </form>
    </div>
  );
};

export default PlaceForAdoptionForm;
