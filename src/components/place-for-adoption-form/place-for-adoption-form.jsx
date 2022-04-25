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
          <FormInput
            type="radio"
            name="species"
            value="cat"
            label="Cat"
            onChange={handleChange}
            error={error.species}
          />
          <FormInput
            type="radio"
            name="species"
            value="dog"
            label="Dog"
            onChange={handleChange}
            error={error.species}
          />
        </div>
        <div className="wd-radio-buttons">
          <h3>Age</h3>
          <FormInput
            type="radio"
            name="age"
            value="baby"
            label="Baby"
            onChange={handleChange}
            error={error.age}
          />
          <FormInput
            type="radio"
            name="age"
            value="young"
            label="Young"
            onChange={handleChange}
            error={error.age}
          />
          <FormInput
            type="radio"
            name="age"
            value="adult"
            label="Adult"
            onChange={handleChange}
            error={error.age}
          />
          <FormInput
            type="radio"
            name="age"
            value="senior"
            label="Senior"
            onChange={handleChange}
            error={error.age}
          />
        </div>
        <div className="wd-radio-buttons">
          <h3>Gender</h3>
          <FormInput
            type="radio"
            name="gender"
            value="male"
            label="Male"
            onChange={handleChange}
            error={error.gender}
          />
          <FormInput
            type="radio"
            name="gender"
            value="female"
            label="Female"
            onChange={handleChange}
            error={error.gender}
          />
          <FormInput
            type="radio"
            name="gender"
            value="unknown"
            label="Unknown"
            onChange={handleChange}
            error={error.gender}
          />
        </div>
        <div className="wd-radio-buttons">
          <h3>Size</h3>
          <FormInput
            type="radio"
            name="size"
            value="small"
            label="Small"
            onChange={handleChange}
            error={error.size}
          />
          <FormInput
            type="radio"
            name="size"
            value="medium"
            label="Medium"
            onChange={handleChange}
            error={error.size}
          />
          <FormInput
            type="radio"
            name="size"
            value="large"
            label="Large"
            onChange={handleChange}
            error={error.size}
          />
          <FormInput
            type="radio"
            name="size"
            value="xlarge"
            label="XLarge"
            onChange={handleChange}
            error={error.size}
          />
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
        <Button onClick={handleSubmit}>CONFIRM</Button>
      </form>
    </div>
  );
};

export default PlaceForAdoptionForm;
