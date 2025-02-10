import Swal from "sweetalert2";

const DeleteSweetAlert = (text, onConfirm) => {
  return Swal.fire({
    title: "Are you sure?",
    text: text,
    color: "white",
    background: "#212f3d",
    icon: "question",
    iconColor: "#C0C0C0",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    customClass: {
      confirmButton:
        "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ",
      cancelButton:
        "px-4 py-2 bg-gray-600 text-white rounded border border-white",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};

export default DeleteSweetAlert;
