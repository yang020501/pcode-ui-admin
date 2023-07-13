import Template, {
  TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../components/Template';


import SearchBar from '@/components/SearchBar';
import LineAction from '@/components/LineAction';
import MiniPopup from '@/components/MiniPopup';
import BlockIcon from '@mui/icons-material/Block';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';

import { Button, Divider, Input, Tooltip } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DataGridListItems from '@/components/DataGridListItems';
import { parseToLocalDate } from '@/utils/convert';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '@/selectors/user.selector';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { fetchUsers, resetUserPassord, resetUserPassordError, setUserStatus } from '@/slices/user.slice';
import { CreateAccountRequest, RegisterRequest } from '@/types/register.type';
import CustomAlert from '@/components/Custom/CustomAlert';
import { requestRegister } from '@/slices/register.slice';
import { User } from '@/types/user.type';
import { CustomOnlyIconButton } from '@/components/Custom/CustomButton';
import { getProfile } from '@/selectors/auth.selector';
import ResetPasswordTokenModal from '@/components/ResetPasswordTokenModal';

const AccountPage = () => {


  const dispatch = useDispatch();

  const users = useSelector(getUsers)
  const profile = useSelector(getProfile)

  const initialUserForm: CreateAccountRequest = {
    username: "",
    email: "",
    fullName: "",
    password: "",
    repassword: "",
  }

  const [userForm, setUserForm] = useState(initialUserForm)
  const { username, password, email, fullName, repassword } = userForm
  const [openNewAccountModal, setOpenNewAccountModal] = useState(false)
  const [alert, setAlert] = useState(<></>)
  const [searchData, setSearchData] = useState<Array<User>>([]);
  const [OpenMiniPopupAccounts, setOpenMiniPopupAccounts] = useState("");
  const [OpenResetPassword, setOpenResetPassword] = useState(false);
  const [SelectedUser, setSelectedUser] = useState<User>();

  const closeAlert = () => setAlert(<></>)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {

    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  const renderList = (Users: Array<User>) => {
    let index = Users.findIndex(item => item.id === profile?.id)
    let tempUsers = [...Users]
    tempUsers.splice(index, 1)

    let result = tempUsers.map((item) => {
      return {
        ...item,
        'userStatus': <CustomOnlyIconButton onClick={() => { dispatch(setUserStatus({ user: { id: item.id }, status: Number(item.userStatus) === 0 ? -1 : 0 })) }} color={Number(item.userStatus) === 0 ? 'primary' : 'error'}>
          <Tooltip title={item.userStatus === 0 ? 'Access' : 'Ban'}>
            {Number(item.userStatus) === 0 ? <SpellcheckIcon /> : <BlockIcon />}
          </Tooltip>
        </CustomOnlyIconButton>,
        'resetPassword': <Button
          variant='contained'
          onClick={() => {
            setOpenResetPassword(true)
            setSelectedUser(item)
          }}
        >
          Reset
        </Button>
      }
    })
    return result
  }

  const onCreateAccountSubmit = async (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    event.stopPropagation()

    if (!(password === repassword))
      setAlert(<CustomAlert type={"error"} message="Re-Password differ to Password!" close={() => { closeAlert() }} />)
    else {
      let Form: RegisterRequest = {
        email: userForm.email,
        fullName: userForm.fullName,
        password: userForm.password,
        username: userForm.username
      }
      dispatch(requestRegister(Form))
      setOpenNewAccountModal(false)
    }

  }
  const onResetUserPassword = (event: FormEvent<HTMLFormElement>, selectedUser: User) => {

    event.preventDefault()
    event.stopPropagation()


    dispatch(resetUserPassord({ id: selectedUser.id }))
  }



  useEffect(() => {
    if (users === null) {
      dispatch(fetchUsers())
    }
  }, [])



  return (
    <Template>
      <TemplateSearch>
        <SearchBar
          data={users ? renderList(users) : []}
          keyword={["fullName", "username"]}
          onsearch={(data: any) => { setSearchData(data); }}
          placeholder={''} />
      </TemplateSearch>
      <TemplateLineAction>
        <LineAction
          name={"Create an account"}
          click={() => setOpenNewAccountModal(true)}
        />
      </TemplateLineAction>
      <TemplateData>
        <DataGridListItems
          columns={['username', 'Full Name', 'User Status', 'Reset Password']}
          rows={searchData.length > 0 ? searchData : renderList(users ? users : [])}
          onSelected={() => { }}
          loading={users === undefined ? true : false}
        />
        <MiniPopup
          open={OpenMiniPopupAccounts}
          close={() => setOpenMiniPopupAccounts(OpenMiniPopupAccounts)}
        // actions={[
        //   {
        //     name: "Delete account",
        //     click: () => { deleteAccount() }
        //   }
        // ]} 
        />

      </TemplateData>
      <TemplateModal
        open={openNewAccountModal}
        size="sm"
        form={true}
        onsubmit={onCreateAccountSubmit}
      >
        <TemplateModalTitle>
          <p> Create new account:</p>
          <Divider variant="middle" />
        </TemplateModalTitle>
        <TemplateModalBody>

          <div className="template-modal-content-field">
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Username:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='text' required name="username" value={username} onChange={onChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Full Name:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='text' required name="fullName" value={fullName} onChange={onChange} />
              </div>
            </div>
            {/* <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Date of birth:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='date' name="dateOfBirth" value={parseToLocalDate(dateOfBirth)} onChange={onChange} />
              </div>
            </div> */}

            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Email:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='email' required name="email" value={email} onChange={onChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Password:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='password' required name="password" value={password} onChange={onChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Re-Password:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='password' required name="repassword" value={repassword} onChange={onChange} />
              </div>
            </div>

            {/* <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Role:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Select
                  labelId="demo-simple-select-label"
                  name="role"
                  value={role}
                  onChange={onChange}
                  required
                >
                  <MenuItem value={"student"}>student</MenuItem>
                  <MenuItem value={"lecturer"}>lecturer</MenuItem>
                  <MenuItem value={"mod"}>mod</MenuItem>
                </Select>

              </div>
            </div> */}
            {alert}
          </div>
        </TemplateModalBody>
        <TemplateModalAction
          activeRight={"Create"}
          size="sm"
          funcError={() => { setOpenNewAccountModal(false) }}

        />
      </TemplateModal>
      <ResetPasswordTokenModal
        open={OpenResetPassword}
        selectedUser={SelectedUser ? SelectedUser : null}
        onReset={(e: FormEvent<HTMLFormElement>, selectedUser: User) => { onResetUserPassword(e, selectedUser) }}
        onCancel={() => {
          setOpenResetPassword(false);
          dispatch(resetUserPassordError())
        }}
      />
    </Template >
  )
}

export default AccountPage