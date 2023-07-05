'use client'

import Select from 'react-select'
import useCountries from '../hooks/useCountries';

export type CountrySelectValue = {
    flag: string;
    label:string;
    latlng: number[];
    region:string;
    value:string;
}

interface CountrySelectProps{
    value?: CountrySelectValue;
    onChange:(value:CountrySelectValue) => void;
}

function CountrySelect({value,onChange}):React.FC<CountrySelectProps> {

    const {getAll} = useCountries();
    

  return (
    <div>
        <Select
            placeholder={'Anywhere'}
            isClearable
            options={getAll()}
            value={value}
            onChange={(value) => onChange(value as CountrySelectValue)}
            formatOptionLabel={(option:any) => (
                <div className='flex flex-row items-center gap-3'>
                    <div>
                        {option.label},
                        <span className='text-neutral-400 ml-2'>
                            {option.region}
                        </span>
                    </div>
                </div>
            )}
            classNames={{
                control:() => 'p-3 border-2',
                input: () => 'text-lg',
                option: () => 'text-lg'
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius:6,
                colors:{
                    ...theme.colors,
                    primary:'black',
                    primary25: '#ffe4e6'
                }
            })}
        />
    </div>
  )
}

export default CountrySelect