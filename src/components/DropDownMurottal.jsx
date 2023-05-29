import { useDispatch } from 'react-redux';
import { murottals } from '../utils/links';
import { changeQari } from '../features/surat';

const DropDownMurottal = () => {
  const dispatch = useDispatch();

  const handleChangeQari = (e) => {
    const value = e.target.value;
    dispatch(changeQari(value));
  };

  return (
    <div>
      <select name="murottals" id="murottals" className="bg-lightBlue font-semibold rounded-sm m-5 p-1 shadow-md text-sm  " onChange={handleChangeQari}>
        {murottals.map((qari) => {
          const { id, value, name } = qari;
          return (
            <option value={value} key={id}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDownMurottal;
