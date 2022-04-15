import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormInput from "../form-input/form-input";
import Button from "../button/button";

import "./place-for-adoption-form.styles.scss";
import { addPostedItem } from "../../redux/user/user.actions";
import { addPet, getbreeds } from "../../redux/pet-data/pet-data.actions";

const PlaceForAdoptionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [error, setError] = useState({});
  const [breeds, setBreeds] = useState(["Select a breed"]);
  const [itemInformation, setItemInformation] = useState({
    id: Date.now(),
    name: "",
    species: "",
    age: "",
    gender: "",
    size: "",
    breed: "",
    description: "",
    url: null,
    contact: {
      userId: currentUser.id,
      email: currentUser.email,
      phone: currentUser.phone,
    },
    photos: [
      "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/55262200/1/?bust=1649605022&width=600",
    ],
    category: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      if (itemInformation.species === "cat" && itemInformation.age === "baby") {
        itemInformation.category = "kittens";
      }
      if (
        itemInformation.species === "cat" &&
        itemInformation.age === "adult"
      ) {
        itemInformation.category = "cats";
      }
      if (itemInformation.species === "dog" && itemInformation.age === "baby") {
        itemInformation.category = "puppies";
      }
      if (
        itemInformation.species === "dog" &&
        itemInformation.age === "adult"
      ) {
        itemInformation.category = "dogs";
      }

      addPet(dispatch, itemInformation);
      addPostedItem(dispatch, itemInformation);
      navigate("/profile", { replace: true });
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
        <Button onClick={handleSubmit}>CONFIRM</Button>
      </form>
    </div>
  );
};

export default PlaceForAdoptionForm;
