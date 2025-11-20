import  {  useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDeletUserAccountMutation } from "../../app/Features/loggedUserApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../app/Features/Slices/authSlice";
import useNotification from "../../hook/useNotification";



const DangerZone = () => {

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const[deleteAccount,{isLoading:isDeleting}]=useDeletUserAccountMutation();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const notify = useNotification

  const handleDeleteAccount = async () => {
    try {
        
    await deleteAccount().unwrap();
    notify("Account deleted successfully!", "success");
    dispatch(logout())

     setTimeout(() => {
      navigate("/");
     },1500);
    } catch {
     notify("Failed to delete account:", "error");
    }
  };

  return (
    <div>
      <h2 className="text-lg md:!text-2xl whitespace-nowrap md:!whitespace-pre-wrap font-bold text-gray-800 mb-6">Danger Zone</h2>
      <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
        
         
          <div >
            
           <div className="flex items-start gap-2 mb-4">
             <FaTrash className="text-red-600 mt-1" size={24} />
              <h3 className="text-lg font-semibold text-red-900 mb-2">Delete Account</h3>

           </div>
            <p className="text-red-700 mb-4 text-sm md:!text-base">
              Once you delete your account, there is no going back. Please be certain.
            </p>

            {!deleteConfirm ? (
              <button
                onClick={() => setDeleteConfirm(true)}
                className="px-6 py-3 text-sm md:!text-base bg-red-600 text-white whitespace-nowrap rounded-lg font-medium hover:bg-red-700 transition-all"
              >
                Delete My Account
              </button>
            ) : (
              <div className="space-y-4">
                <div className="p-2 bg-white border-2 border-red-300 rounded-lg text-sm md:!text-base">
                  <p className="text-red-900 font-medium mb-3">
                    Are you absolutely sure? This action cannot be undone!
                  </p>
                  <div className="flex flex-col gap-3 w-38 md:!w-50">
                    <button
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className=" p-2 bg-red-600 text-white whitespace-nowrap rounded-lg font-medium hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                      {isDeleting ? "Deleting..." : "Yes, Delete Forever"}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(false)}
                      className=" p-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
    
      </div>
    </div>
  );
};

export default DangerZone;
