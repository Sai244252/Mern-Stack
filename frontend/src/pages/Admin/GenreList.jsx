import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useFetchGenresQuery,
  useDeleteGenreMutation,
} from "../../redux/api/genre";
import { toast } from "react-toastify";
import GenreForm from "../../components/GenreForm";
import Modal from "../../components/Modal";

function GenreList() {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required ");
      return;
    }

    try {
      const genre = await createGenre({ name }).unwrap();

      if (genre.error) {
        toast.error(genre.error);
      } else {
        setName("");
        toast.success(`${genre.name} is created.`);

        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();
    if (!updateGenre) {
      toast.error("Genre name is rquired");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updatedGenre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.erorr) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} updated successfully!!!`);
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);

        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async (e) => {
    e.preventDefault();

    try {
      const result = await deleteGenre({
        id: selectedGenre._id,
      }).unwrap();

      if (!result) {
        toast.error(result.error);
      } else {
        toast.success(`Deleted ${result?.name} Successfully`);
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);

        refetch();
      }
    } catch (error) {
      console.error("Unable to delete Genre!!");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h1 className="h-12 text-white">Manage Genres</h1>

        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />

        <br />

        <div className="flex flex-wrap">
          {genres?.map((genre) => (
            <div key={genre._id}>
              <button
                className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre?.name);
                  }
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
}

export default GenreList;
