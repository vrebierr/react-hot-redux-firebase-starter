import React from 'react';
import TextInput from '../common/TextInput';

const MessageForm = ({message, onSave, onChange, saving}) => {
  return (
    <form>
      <h5>Envoyer un nouveau message</h5>

      <TextInput
        name="content"
        label="Votre message"
        onChange={onChange}
        value={message.content}
        />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Loading...': 'Envoyer'}
        className="btn btn-primary"
        onClick={onSave} />
    </form>
  );
};

MessageForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  message: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default MessageForm;
