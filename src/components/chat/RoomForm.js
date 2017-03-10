import React from 'react';
import TextInput from '../common/TextInput';

const RoomForm = ({room, onSave, onChange, saving}) => {
  return (
    <form>
      <h5>Crée une nouvelle salle</h5>

      <TextInput
        name="name"
        label="Nom"
        onChange={onChange}
        value={room.name}
        required
        />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Loading...': 'Créer'}
        className="btn btn-primary"
        onClick={onSave} />
    </form>
  );
};

RoomForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  room: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default RoomForm;
