// import Select, {
//   ActionMeta,
//   GroupBase,
//   OptionsOrGroups,
//   StylesConfig,
// } from 'react-select';

// interface ISelectItemsProps {
//   options?: OptionsOrGroups<any, GroupBase<any>>;
//   value?: any;
//   onChange?: (_newValue: any, _actionMeta: ActionMeta<any>) => void;
//   className: string;
//   placeholder: string;
//   name: string;
// }

// export function SelectItems({
//   options,
//   value,
//   onChange,
//   className,
//   placeholder,
//   name,
// }: ISelectItemsProps) {
//   const colourStyles: StylesConfig<any, false, GroupBase<any>> | undefined = {
//     menuList: (styles) => ({
//       ...styles,
//       background: '#E6E1DC',
//     }),
//     option: (styles, { isFocused, isSelected }) => ({
//       ...styles,
//       color: isFocused || isSelected ? '#E6E1DC' : undefined,
//       background: isFocused || isSelected ? '#3F362F' : undefined,
//       zIndex: 1,
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 100,
//     }),
//     control: (base, state) => ({
//       ...base,
//       background: '#E6E1DC',
//       borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
//       // boxShadow: state.isFocused || undefined,
//     }),
//   };

//   return (
//     <Select
//       name={name}
//       // type='text'
//       options={options}
//       value={value}
//       onChange={onChange}
//       className={className}
//       placeholder={placeholder}
//       styles={colourStyles}
//       required={true}
//     />
//   );
// }
