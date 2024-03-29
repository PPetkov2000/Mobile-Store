export const REGISTER_FIELDS = (formData) => [
  {
    id: 1,
    type: 'text',
    name: 'username',
    label: 'Username',
    placeholder: 'Enter Username',
    pattern: '^[A-Za-z0-9]{3,16}$',
    errorMessage: 'Username should be 3-16 characters long and should not include any special characters!',
    required: true,
  },
  {
    id: 2,
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'Enter Email',
    errorMessage: 'Please enter a valid email address!',
    required: true,
  },
  {
    id: 3,
    type: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'Enter Password',
    pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$',
    errorMessage: 'Password should be 6-30 characters long and include at least 1 letter, 1 number, 1 special character!',
    required: true,
  },
  {
    id: 4,
    type: 'password',
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Enter Password again',
    pattern: formData.password,
    errorMessage: 'Passwords do not match!',
    required: true,
  },
]

export const LOGIN_FIELDS = (formData) => [
  {
    id: 1,
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'Enter Email',
    required: true,
  },
  {
    id: 2,
    type: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'Enter Password',
    required: true,
  },
]

export const SHIPPING_FIELDS = (formData) => [
  {
    id: 1,
    type: 'text',
    name: 'address',
    label: 'Address',
    placeholder: 'Enter Address',
    icon: 'fa fa-address-book',
    required: true,
  },
  {
    id: 2,
    type: 'text',
    name: 'city',
    label: 'City',
    placeholder: 'Enter City',
    icon: 'fa fa-home',
    required: true,
  },
  {
    id: 3,
    type: 'text',
    name: 'postalCode',
    label: 'Postal Code',
    placeholder: 'Enter Postal Code',
    icon: 'fa fa-envelope-open',
    required: true,
  },
  {
    id: 4,
    type: 'text',
    name: 'country',
    label: 'Country',
    placeholder: 'Enter Country',
    icon: 'fa fa-globe',
    required: true,
  },
]

export const PROFILE_FIELDS = (formData) => [
  {
    id: 1,
    type: 'text',
    name: 'username',
    label: 'Username',
    placeholder: 'Enter Username',
    pattern: '^[A-Za-z0-9]{3,16}$',
    errorMessage: 'Username should be 3-16 characters long and should not include any special characters!',
    required: true,
  },
  {
    id: 2,
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'Enter Email',
    errorMessage: 'Please enter a valid email address!',
    required: true,
  },
  {
    id: 3,
    type: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'Enter Password',
    pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$',
    errorMessage: 'Password should be 6-30 characters long and include at least 1 letter, 1 number, 1 special character!',
    required: true,
  },
  {
    id: 4,
    type: 'password',
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Enter Password again',
    pattern: formData.password,
    errorMessage: 'Passwords do not match!',
    required: true,
  },
]

export const USER_EDIT_FIELDS = (formData) => [
  {
    id: 1,
    type: 'text',
    name: 'username',
    label: 'Username',
    placeholder: 'Enter Username',
    pattern: '^[A-Za-z0-9]{3,16}$',
    errorMessage: 'Username should be 3-16 characters long and should not include any special characters!',
  },
  {
    id: 2,
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'Enter Email',
    errorMessage: 'Please enter a valid email address!',
  },
  {
    id: 3,
    type: 'checkbox',
    name: 'isAdmin',
    label: 'Is Admin',
    checked: formData.isAdmin,
    parentClass: 'inputWrapper',
  },
]

export const PRODUCT_FIELDS = (formData, isEditing = false) => [
  {
    id: 1,
    type: 'text',
    name: 'name',
    label: 'Name',
    placeholder: 'Enter Name',
    pattern: '^[A-Za-z0-9]{3,16}$',
    errorMessage: 'Name should be 3-16 characters long and should not include any special characters!',
    required: !isEditing,
  },
  {
    id: 2,
    type: 'text',
    name: 'brand',
    label: 'Brand',
    placeholder: 'Enter Brand',
    pattern: '^[A-Za-z0-9]{3,16}$',
    errorMessage: 'Brand should be 3-16 characters long and should not include any special characters!',
    required: !isEditing,
  },
  {
    id: 3,
    type: 'number',
    name: 'price',
    label: 'Price',
    placeholder: 'Enter Price',
    min: 1,
    errorMessage: 'Price should be greater than 0',
    required: !isEditing,
  },
  {
    id: 4,
    type: 'text',
    name: 'cpu',
    label: 'CPU',
    placeholder: 'Enter CPU',
    pattern: '^[A-Za-z0-9]{3,16}$',
    errorMessage: 'CPU should be 3-16 characters long and should not include any special characters!',
    required: !isEditing,
  },
  {
    id: 5,
    type: 'text',
    name: 'camera',
    label: 'Camera',
    placeholder: 'Enter Camera',
    pattern: '^[A-Za-z0-9]{3,16}$',
    errorMessage: 'Camera should be 3-16 characters long and should not include any special characters!',
    required: !isEditing,
  },
  {
    id: 6,
    type: 'number',
    name: 'size',
    label: 'Size',
    placeholder: 'Enter Size',
    min: 1,
    errorMessage: 'Size should be greater than 0',
    required: !isEditing,
  },
  {
    id: 7,
    type: 'number',
    name: 'weight',
    label: 'Weight',
    placeholder: 'Enter Weight',
    min: 1,
    errorMessage: 'Weight should be greater than 0',
    required: !isEditing,
  },
  {
    id: 8,
    type: 'text',
    name: 'display',
    label: 'Display',
    placeholder: 'Enter Display',
    pattern: '^[A-Za-z0-9]{3,16}$',
    errorMessage: 'Display should be 3-16 characters long and should not include any special characters!',
    required: !isEditing,
  },
  {
    id: 9,
    type: 'text',
    name: 'battery',
    label: 'Battery',
    placeholder: 'Enter Battery',
    pattern: '^[A-Za-z0-9]{3,16}$',
    errorMessage: 'Battery should be 3-16 characters long and should not include any special characters!',
    required: !isEditing,
  },
  {
    id: 10,
    type: 'text',
    name: 'memory',
    label: 'Memory',
    placeholder: 'Enter Memory',
    pattern: '^[A-Za-z0-9]{3,16}$',
    errorMessage: 'Memory should be 3-16 characters long and should not include any special characters!',
    required: !isEditing,
  },
  {
    id: 11,
    type: 'text',
    name: 'description',
    label: 'Description',
    placeholder: 'Enter Description',
    pattern: '^[A-Za-z0-9]{3,16}$',
    errorMessage: 'Description should be 3-16 characters long and should not include any special characters!',
    required: !isEditing,
  },
  {
    id: 12,
    type: 'number',
    name: 'countInStock',
    label: 'Count In Stock',
    placeholder: 'Enter Count In Stock',
    min: 1,
    errorMessage: 'Count In Stock should be greater than 0',
    required: !isEditing,
  },
  {
    id: 13,
    type: 'text',
    name: 'images',
    label: 'Images',
    placeholder: 'Enter Images',
    errorMessage: 'Enter some images of the product',
    required: !isEditing,
  },
]
