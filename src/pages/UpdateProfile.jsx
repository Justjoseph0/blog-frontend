import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { React, useRef, useEffect } from "react";
import { useState } from "react";
import api, { apiUrl } from "@/api";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/Loading";

const UpdateProfile = () => {
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImagefile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/create_profile/");
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setBio(res.data.bio);
        setBirthday(res.data.birthday);
        setCountry(res.data.country);
        setGender(res.data.gender);
        setAddress(res.data.street_address);
        setCity(res.data.city);
        setPhoneNumber(res.data.phone_number);
        setFacebook(res.data.facebook_url);
        setInstagram(res.data.instagram_url);

        // console.log(res.data);

        const imageUrl = res.data.profile_picture
          ? `${apiUrl}${res.data.profile_picture}`
          : "http://bootdey.com/img/Content/avatar/avatar1.png";
        setImagePreview(imageUrl);
      } catch (error) {
        toast.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagefile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input on image click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle image submission
  const handleSubmitImage = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    if (imageFile) {
      const formData = new FormData();
      formData.append("profile_picture", imageFile);

      try {
        const res = await api.post("/create_profile/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Image Uploaded successfully");
      } catch (error) {
        if (error.response.data) {
          const errorData = error.response.data;
          const profilePicErrors = errorData.profile_picture;
          profilePicErrors.forEach((message) => {
            toast.error(message);
          });
        } else {
          toast.error(error.message || "Error uploading image.");
        }
      }
    } else {
      toast.error("Please Select an image.");
      setIsSubmiting(false); 
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setIsSubmiting(true)
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("bio", bio);
    formData.append("birthday", birthday);
    formData.append("country", country);
    formData.append("gender", gender);
    formData.append("street_address", address);
    formData.append("city", city);
    formData.append("phone_number", phoneNumber);

    if (facebook) {
      formData.append("facebook_url", facebook);
    }
    if (instagram) {
      formData.append("instagram_url", instagram);
    }

    try {
      const res = await api.post("create_profile/", formData);
      toast.success("Profile updated successfully");
      navigate("/view-profile");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (errorData.first_name) {
          toast.error(errorData.first_name);
        }
        if (errorData.last_name) {
          toast.error(errorData.last_name);
          return;
        }
        if (errorData.bio) {
          toast.error(errorData.bio);
          return;
        }
        if (errorData.birthday) {
          toast.error(errorData.birthday);
          return;
        }
        if (errorData.phone_number) {
          toast.error(errorData.phone_number);
          return;
        }
        if (errorData.gender) {
          toast.error(`gender: ${errorData.gender}`);
          return;
        }
        if (errorData.facebook_url) {
          toast.error(errorData.facebook_url);
          return;
        }
        if (errorData.instagram_url) {
          toast.error(errorData.instagram_url);
          return;
        }
      } else {
        toast.error(error.message || "Error updating profile.");
      }
    } finally {
      setIsSubmiting(false)
    }
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Toaster />
      <Navbar />

      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-6">
          <form
            onSubmit={handleSubmitImage}
            className="md:w-1/3 mb-4 md:mb-0 flex justify-center items-center flex-col"
          >
            {/* Image display */}
            <div
              className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-500 mt-4">JPG or PNG no larger than 5 MB</p>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {/* Submit button */}
            <Button type="submit" className="mt-2 text-white">
              {isSubmiting ? "Uploading ...." : "Upload new image"}
            </Button>
          </form>

          <div className="md:w-2/3 md:pl-6">
            <h2 className="md:text-xl text-lg font-semibold text-gray-700 mb-4">
              Personal Information
            </h2>
            <form onSubmit={updateProfile}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">
                    First name
                  </label>
                  <Input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName || ""}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">
                    Last name
                  </label>
                  <Input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName || ""}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">
                    Country
                  </label>
                  <Input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    value={country || ""}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">
                    Street address
                  </label>
                  <Input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    value={address || ""}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">
                    City
                  </label>
                  <Input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    value={city || ""}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block mb-2">
                    Select Gender:
                  </label>
                  <Select value={gender} onValueChange={handleGenderChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                      <SelectItem value="O">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  bio
                </label>
                <Textarea
                  type="text"
                  className="w-full px-4 border rounded-md"
                  name="bio"
                  rows={"3"}
                  onChange={(e) => setBio(e.target.value)}
                  value={bio || ""}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">
                    Phone number
                  </label>
                  <Input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    value={phoneNumber || ""}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">
                    Date Of Birth
                  </label>
                  <Input
                    type="date"
                    className="w-full px-4 py-2 border rounded-md"
                    value={birthday || ""}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">
                    Instagram Link
                  </label>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border rounded-md"
                    value={instagram || ""}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">
                    Twitter Link
                  </label>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border rounded-md"
                    value={facebook || ""}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button className="w-full md:w-auto px-4 py-2">
                 {isSubmiting ? 'Saving .....' :  "Save changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UpdateProfile;
