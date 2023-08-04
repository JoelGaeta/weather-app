interface Address {
  street: string;
  city?: string;
  state?: string;
  zip?: string;
}

interface AddressFormProps {
  address: Address;
  onAddressChange: (address: Address) => void;
  onGeocodeAddress: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onAddressChange,
  onGeocodeAddress,
}) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          marginTop: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          style={{ margin: 5, borderRadius: 10, padding: 10 }}
          type="text"
          value={address.street}
          onChange={(event) =>
            onAddressChange({ ...address, street: event.target.value })
          }
          placeholder="Street Address"
        />
        <input
          style={{ margin: 5, borderRadius: 10, padding: 10 }}
          type="text"
          value={address.city}
          onChange={(event) =>
            onAddressChange({ ...address, city: event.target.value })
          }
          placeholder="City"
        />
        <input
          style={{ margin: 5, borderRadius: 10, padding: 10 }}
          type="text"
          value={address.state}
          onChange={(event) =>
            onAddressChange({ ...address, state: event.target.value })
          }
          placeholder="State"
        />
        <input
          style={{ margin: 5, borderRadius: 10, padding: 10 }}
          type="text"
          value={address.zip}
          onChange={(event) =>
            onAddressChange({ ...address, zip: event.target.value })
          }
          placeholder="ZIP Code"
        />
      </div>
      <button
        style={{ margin: 5, borderRadius: 10, padding: 15 }}
        onClick={onGeocodeAddress}
      >
        Get Forecast!
      </button>
    </div>
  );
};

export default AddressForm;
