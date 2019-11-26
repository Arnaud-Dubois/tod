import React from 'react';

export default function Form() {
  return (
      <>
        <form>
            <div className="field">
                <label className="label">New Todo</label>
            <div className="control">
                <input className="input" type="text" placeholder="Text input" />
            </div>
            </div>
            <div class="control">
              <button class="button is-primary">Submit</button>
            </div>
        </form>
    </>
  );
}
