import React from 'react';

const ProductInput = ({ label, name, value, onChange }) => {
	const inputId = `product-input-${name}`;

	return (
		<div className="grid-item">
			<label htmlFor={inputId}>
				{label}:
				<br />
				<input
					className="detailInput"
					type="text"
					name={name}
					id={inputId} // Set the input id to match the label's htmlFor
					value={value || ''}
					onChange={onChange}
				/>
			</label>
		</div>
	);
};

export default ProductInput;
