import { useMemo } from 'react';
import Select, {
  components,
  GroupBase,
  OptionProps,
  SingleValueProps,
  StylesConfig,
} from 'react-select';

const SingleSelectOptionComponent = (props: OptionProps<SingleSelectValue>) => {
  return (
    <components.Option {...props}>
      <div className='flex items-center space-x-2 cursor-pointer px-2 py-1'>
        {props.data.icon && (
          <img className='w-6 sm:w-5 h-auto' src={props.data.icon} alt='' />
        )}
        <span className='text-secondaryBg/80'>{props.data.label}</span>
      </div>
    </components.Option>
  );
};

const SingleSelectValueComponent = (
  props: SingleValueProps<SingleSelectValue>
) => {
  return (
    <components.SingleValue {...props}>
      <div className='flex items-center space-x-2'>
        {props.data.icon && (
          <img className='w-5 h-auto' src={props.data.icon} alt='' />
        )}
        <span className='text-secondaryBg/80'>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );
};

export type SingleSelectValue = {
  label: string;
  value: string;
  icon?: string;
};

type SingleSelectProps = {
  className?: string;
  placeholderText?: string;
  noOptionsText?: string;
  options?: SingleSelectValue[];
  value?: SingleSelectValue;
  isSearchable?: boolean;
  onChange?: (newVal?: SingleSelectValue | null | undefined) => void;
};

const SingleSelect = (props: SingleSelectProps) => {
  const styles: StylesConfig<
    SingleSelectValue,
    false,
    GroupBase<SingleSelectValue>
  > = useMemo(
    () => ({
      control: (provided) => ({
        ...provided,
        background: 'var(--color-select-field-mainBg)',
        color: 'var(--color-select-field-mainText)',
        border: '1px solid var(--color-select-field-border)',
        borderRadius: '0.75rem',
        boxShadow: 'none',
        '&:hover': {},
      }),
      input: (provided) => ({
        ...provided,
        color: 'var(--color-select-field-inputText)',
        overflow: 'hidden',
      }),
      placeholder: (provided) => ({
        ...provided,
        color: 'var(--color-select-field-placeholderText)',
        fontSize: '0.875rem',
      }),
      menu: (provided) => ({
        ...provided,
        background: 'var(--color-select-field-mainBg)',
        color: 'var(--color-select-field-mainText)',
        border: '1px solid var(--color-select-field-menu-border)',
        borderRadius: '0.4rem',
        boxShadow: 'var(--color-select-field-menu-shadow)',
        zIndex: '100',
      }),
      menuList: (provided) => ({
        ...provided,
        '::-webkit-scrollbar': {
          width: 'var(--width-scrollThumb)',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'var(--color-scrollThumb)',
        },
        scrollbarWidth: 'thin',
      }),
      option: () => ({}),
      noOptionsMessage: (provided) => ({
        ...provided,
        color: 'var(--color-select-field-placeholderText)',
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        color: 'var(--color-select-field-mainText)',
        cursor: 'pointer',
        '&:hover': { color: 'var(--color-select-field-mainText)' },
      }),
    }),
    []
  );

  return (
    <Select
      className={`w-full ${props.className ?? ''}`}
      styles={styles}
      placeholder={props.placeholderText}
      noOptionsMessage={
        props.noOptionsText ? () => props.noOptionsText : undefined
      }
      options={props.options}
      value={props.value ?? null}
      onChange={(newVal) => props.onChange?.(newVal)}
      components={{
        Option: SingleSelectOptionComponent,
        SingleValue: SingleSelectValueComponent,
      }}
      isSearchable={props.isSearchable}
      isClearable={false}
    />
  );
};

export default SingleSelect;
