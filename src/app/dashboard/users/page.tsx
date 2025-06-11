"use client";

import { useEffect, useState } from "react";
import { HEADER_FIELD } from "./constants";
import Table from "@/components/table";
import CustomCheckbox from "@/components/checkbox";
import { EditModal } from "@/components/editDialog";
import UserProfileDialog from "@/components/userProfileDialog";
import { User, UserFilter, Variables } from "./type";
import AddUserModal from "@/components/addUserModal";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_SELECTED_USER, GET_USERS } from "./apolo";
import DeleteModal from "@/components/deleteModal";
import DeleteUserDialog from "@/components/deleteUserDialog";
import { ITEMS_PER_PAGE_SELECT_OPTION, ROLE_SELECT_OPTION, STATUS_SELECT_OPTION } from "@/constants";
import SelectItem from "@/components/selectItem";
import { PaginationWithSelect } from "@/components/pagination";
import { formatDateSimple } from "@/utils/formatDate";
import SearchField from "@/components/searchField";
import { toast } from "react-toastify";

/**
 * A dashboard page for users.
 *
 * This page will display a table with the information of all users. 
 * The user can add a new user, edit the existing users
 * select multiple users and delete them.
 *
 * @returns A React component that renders the users table.
 */
export default function Users() {
  // State to manage selected users to edit
  const [selectedCheckboxUsers, setSelectedCheckboxUsers] = useState<string[]>([]);
  // State to manage the open state of edit
  const [openEdit, setOpenEdit] = useState(false);
  // State to manage the open state of delete
  const [openDelete, setOpenDelete] = useState(false);
  // State to manage the open state of add user
  const [openAddUser, setOpenAddUser] = useState(false);
  //  State to manage the selected user to edit
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  //  State to manage the selected delete user
  const [selectedDeleteUser, setSelectedDeleteUser] = useState<User | null>(null);
  // State to manage the number of items per page
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // State to manage the offset of items
  const [itemOffset, setItemOffset] = useState(0);
  // Calculate the current page based on the item offset and items per page
  const currentPage = Math.floor(itemOffset / itemsPerPage);
  // State to manage the data of users
  const [dataUsers, setDataUsers] = useState<User[]>([]);
  // State to manage the role filter
  const [role, setRole] = useState<string | null>(null);
  // State to manage the search
  const [search, setSearch] = useState("");

  const [debouceSearchTerm, setDebouncedSearchTerm] = useState("");
  // State to manage the status filter
  const [status, setStatus] = useState<string | null>(null);
  // Mutation to delete a user by userId
  const [deleteUserByUserId] = useMutation(DELETE_SELECTED_USER, {
    refetchQueries: [
      GET_USERS,
      'GetUsers',
    ],
  })
  // Query to get the users with pagination and filtering
  const { data, loading, error, refetch } = useQuery(GET_USERS, {
    variables: getVariables(
      itemsPerPage,
      itemOffset,
      role ?? undefined,
      status ?? undefined,
      debouceSearchTerm ?? ""
    ),
    fetchPolicy: "cache-and-network", nextFetchPolicy: "cache-first",
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(search.trim());
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  /**
   * Returns the variables for the GET_USERS query.
   * The variables include the first and offset parameters for pagination,
   * and the filter parameters for filtering by role and status.
   * @param {number} first The number of items to return per page.
   * @param {number} offset The offset of the items to return.
   * @returns {Variables} The variables for the GET_USERS query.
   */
function buildUserFilter(
  role?: string,
  status?: string,
  searchTerm?: string
): UserFilter | undefined {
  const filters: UserFilter[] = [];

  if (role) {
    filters.push({ roleuser: { equalTo: role } });
  }

  if (status) {
    filters.push({ status: { equalTo: status } });
  }

  const trimmedSearch = searchTerm?.trim();
  if (trimmedSearch) {
    const searchFilter: UserFilter = {
      or: [
        { fullname: { includesInsensitive: trimmedSearch } },
        { email: { includesInsensitive: trimmedSearch } },
        { userId: { includesInsensitive: trimmedSearch } },
        { roleuser: { includesInsensitive: trimmedSearch } },
        { status: { includesInsensitive: trimmedSearch } },
      ],
    };
    filters.push(searchFilter);
  }

  if (filters.length === 0) return undefined;
  if (filters.length === 1) return filters[0];
  return { and: filters };
}

function getVariables(
  first: number,
  offset: number,
  role?: string,
  status?: string,
  searchTerm?: string
): Variables {
  const filter = buildUserFilter(role, status, searchTerm);
  return {
    first,
    offset,
    filter,
  };
}



  


  console.log("Query data:", data?.allUsers?.nodes);
  /**
   * Opens the edit modal by setting the `openEdit` state to true.
   */
  function handleOpenEdit(user: User) {
    setSelectedUser(user);
    setOpenEdit(true)
  }

  /**
   * Opens the add user modal by setting the `openAddUser` state to true.
   */
  function handleOpenAdd() {
    setOpenAddUser(true)
  }

  /**
  * Updates the state of the item offset based on the selected page and the
  * number of items per page.
  * @param {number} selectedPage The selected page.
  */
  const handlePageChange = (selectedPage: number) => {
    const newOffset = selectedPage * itemsPerPage;
    setItemOffset(newOffset);
  };

  /**
   * Handles changes to the role select input by updating the `role` state
   * variable. If the selected value is different from the current `role` state,
   * it will filter  value.
   * @param {string} value The selected value from the role select input.
   */
  const handleOnChangeRole = (value: string) => {
    const selectedRole = value || null;
    if (selectedRole !== role) {
      setRole(selectedRole);
    }
  }

  /**
   * Handles changes to the status select input by updating the `status` state
   * variable. If the selected value is different from the current `status` state,
   * it will filter value.
   * @param {string} value The selected value from the status select input.
   */
  const handleOnChangeStatus = (value: string) => {
    const selectedStatus = value || null;
    if (selectedStatus !== status) {
      setStatus(selectedStatus);
    }
  }

  /**
   * Opens the delete modal by setting the `openDelete` state to true and 
   * stick the selected user to delete
   */
  function handleOpenDelete(user: User) {
    setSelectedDeleteUser(user)
    console.log("Selected user to delete:", user);
    setOpenDelete(true)
  }

  /**
   * Closes the edit modal by setting the `openEdit` state to false.
   */
  function handleCloseEdit() {
    setOpenEdit(false)
  }

  /**
   * Closes the delete modal by setting the `openDelete` state to false and logs the state of the modal.
   */
  function handleCloseDelete() {
    setOpenDelete(false)
  }

  /**
   * Closes the add user modal by setting the `openAddUser` state to false.
   */
  function handleCloseAdd() {
    setOpenAddUser(false)
  }


  /**
   * Handles the select all checkbox.
   *
   * If the checkbox is checked, it sets the `selectedUsers` state to an array of
   * all user emails. If the checkbox is unchecked, it sets the `selectedUsers`
   * state to an empty array.
   *
   * @param {boolean | 'indeterminate'} checked The state of the checkbox.
   */
  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedCheckboxUsers(dataUsers.map((user: User) => user.email));
    } else {
      setSelectedCheckboxUsers([]);
    }
  };


  /**
   * Handles changes to the items per page select input by updating the
   * `itemsPerPage` state variable and resetting the offset.
   *
   * @param {number} value The selected value from the items per page select input.
   */
  const handleOnChangeItemsPerPage = (value: number) => {
    console.log("Change items per page to:", value);
    setItemsPerPage(value);
    setItemOffset(0); // Reset offset when items per page changes
  };

  /**
   * Resets the filter values to their default state and refetches the users
   * data. This will show all users in the table.
   */
  const handleResetFilter = () => {
    setRole(null);
    setStatus(null);
    refetch({});
  };

  /**
   * Handles the selection of individual users.
   *
   * If the item is already selected, it removes the item from the
   * `selectedUsers` array. If the item is not selected, it adds the item
   * to the `selectedUsers` array.
   *
   * @param {string} item The email of the user that was selected or deselected.
   */
  const handleItemChange = (item: string) => {
    setSelectedCheckboxUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(item)) {
        return prevSelectedUsers.filter((user) => user !== item);
      } else {
        return [...prevSelectedUsers, item];
      }
    })
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>)  {
    setSearch(e.target.value);
    setItemOffset(0);
  }
  /**
   * Handles the deletion of the selected user.
   *
   * Calls the `deleteUserByUserId` mutation with the selected user's ID and
   * refetches the users data after deletion. If the deletion fails, it logs
   * an error message to the console.
   */
  const handleDeleteUser = async () => {
    console.log("Deleting user:", selectedDeleteUser?.userId);
    if (!selectedDeleteUser?.userId) {
      console.warn("No user ID provided for deletion.");
      return;
    }
    try {
      await deleteUserByUserId({
        variables: {
          input: {
            userId: selectedDeleteUser.userId,
          },
        },
      });
      console.log("User deleted successfully.", selectedDeleteUser.userId);
      refetch();
      setOpenDelete(false);
      toast.success("User deleted successfully.");
      setSelectedDeleteUser(null);// 
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user.");
    }
  };

  /**
   * Effect to fetch users data when the component mounts or when the
   * selected user, open edit, open delete, open add user, or selected delete user changes.
   */
  useEffect(() => {
    if (!data || loading || error) return;
    const USERS = data?.allUsers?.nodes?.length
      ? data.allUsers.nodes
      : [];
    console.log("Fetched users:", USERS);
    const mappedUsers = USERS.map((user: User) => ({
      checkbox: <CustomCheckbox
        checked={selectedCheckboxUsers.includes(user.email)}
        onCheckedChange={() => handleItemChange(user.email)}
      />,
      user_id: user.userId,
      name: user.fullname,
      email: user.email,
      password: user.password,
      role: (
        <div className={` w-[50px] text-center text-[12px] rounded-[8px] ${getRoleClass(user.roleuser)}`}>
          {user.roleuser}
        </div>
      ),
      status: (
        <div className={` w-[50px] text-center text-[12px] rounded-[8px] ${getActiveClass(user.status)}`}>
          {user.status}
        </div>
      ),
      createdAt: formatDateSimple(user.createAt),
      lastLogin: formatDateSimple(user.lastLogin),
      action: (
        renderModel(openEdit, openDelete, user)
      ),
    }))
    setDataUsers(mappedUsers);
    console.log("Mapped users:", mappedUsers);
  }, [data, loading, error, selectedUser, openEdit, openDelete, openAddUser, selectedDeleteUser]);


  /**
   * Renders the action modal components for a user.
   *
   * This function returns a JSX element containing the Edit and Delete modals
   * for a given user. The modals are displayed based on the `openEdit` and
   * `openDelete` state variables. The EditModal allows for editing the user's
   * profile, while the DeleteModal confirms the deletion of the user.
   *
   * @param {boolean} openEdit - Indicates whether the edit modal should be open.
   * @param {boolean} openDelete - Indicates whether the delete modal should be open.
   * @param {User} user - The user object for which the modals are being rendered.
   * @returns {JSX.Element} The JSX element containing the modals.
   */

  function renderModel(openEdit: boolean, openDelete: boolean, user: User) {
    return (
      <div className="flex gap-1 px-0 align-center">
        <EditModal dataDialog={
          <UserProfileDialog handleClose={handleCloseEdit}
            mode="edit" defaultValues={selectedUser ?? undefined} onRefetchUser={refetch} />}
          open={openEdit && user.userId === selectedUser?.userId} handleOpen={() => handleOpenEdit(user)} />

        <DeleteModal deleteUserDialog={
          <DeleteUserDialog handleClose={handleCloseDelete}
            onConfirm={handleDeleteUser}
            userSelectedToDelete={selectedDeleteUser} />}
          open={openDelete && user.userId === selectedDeleteUser?.userId} handleOpen={() => handleOpenDelete(user)} />
      </div>
    );
  }
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <main className="p-4 flex flex-col gap-4 w-responsive mx-[32px]">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold">Hello User</h1>
          <div className="flex justify-between">
            <div className="flex flex-row gap-2">
              <div className="w-[150px]">
                <SelectItem
                  value={role || ""}
                  selectOption={ROLE_SELECT_OPTION}
                  height="h-[33px]"
                  name="role"
                  onValueChange={handleOnChangeRole}
                />
              </div>
              <div className="w-[150px]">
                <SelectItem
                  value={status || ""}
                  selectOption={STATUS_SELECT_OPTION}
                  height="h-[33px]"
                  name="status"
                  onValueChange={handleOnChangeStatus}
                />
              </div>
              <button className="w-[100px] h-[33px] rounded-md border text-gray-700 border-gray-300 bg-white px-3 text-sm shadow-sm hover:border-gray-400 focus:outline-none  focus:border-gray-70 self-end"
                onClick={handleResetFilter}>Reset</button>
            </div>
            <div className="flex flex-row gap-2 items-end w-1/2">
              <div className="w-full">
                <SearchField query ={search} handleChange={handleSearch} />
              </div>
              <AddUserModal
              dataDialog={<UserProfileDialog handleClose={handleCloseAdd} mode="add" onRefetchUser={refetch} />}
              open={openAddUser}
              handleOpen={handleOpenAdd}
            />
            </div>
          </div>
          <Table
            header={HEADER_FIELD}
            data={dataUsers}
            checked={selectedCheckboxUsers.length === dataUsers?.length}
            handleAllItemSelect={handleSelectAll}
            failedDataMessage="No users found. Please add a user to manage."
          />
          <PaginationWithSelect
            pageCount={data?.allUsers?.totalCount / itemsPerPage || 0}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            itemCount={String(itemsPerPage)}
            pageSizeOptions={ITEMS_PER_PAGE_SELECT_OPTION}
            onPageSizeChange={(val) => handleOnChangeItemsPerPage(Number(val))}
          />
        </div>
      </main>
    </>
  );
}
/**
 * Given a role, return a string containing the class names
 * that will give the appropriate background and text color.
 *
 * @param {string} role The role of the user.
 * @returns {string} A string containing the class names.
 */
function getRoleClass(role: string) {
  switch (role) {
    case "student":
      return "bg-blue-100 text-blue-800";
    case "teacher":
      return "bg-green-100 text-green-800";
    case "admin":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

/**
 * Given a role, return a string containing the class names
 * that will give the appropriate background and text color
 * for the active status.
 *
 * @param {string} role The status of the user.
 * @returns {string} A string containing the class names.
 */
function getActiveClass(role: string) {
  switch (role) {
    case "active":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
