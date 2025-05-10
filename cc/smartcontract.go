package chaincode

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

type Property struct {
	ID                 string  `json:"id"`                 // Unique Property ID
	Owner              string  `json:"owner"`              // Owner's Name
	PropertyType       string  `json:"propertyType"`       // Type (Land, House, Apartment, etc.)
	Location           string  `json:"location"`           // Address/Coordinates
	Size               float64 `json:"size"`               // Size in square meters
	MarketValue        float64 `json:"marketValue"`        // Current Market Price
	RegistrationStatus string  `json:"registrationStatus"` // "Registered" or "Pending"
}

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	properties := []Property{
		{ID: "P1", Owner: "Annisa Ardelia", PropertyType: "House", Location: "Jakarta, Indonesia", Size: 120.5, MarketValue: 50000000, RegistrationStatus: "Registered"},
		{ID: "P2", Owner: "Alia", PropertyType: "Apartment", Location: "Bali, Indonesia", Size: 75.0, MarketValue: 30000000, RegistrationStatus: "Registered"},
		{ID: "P3", Owner: "Arifa", PropertyType: "Land", Location: "Surabaya, Indonesia", Size: 2000.0, MarketValue: 80000000, RegistrationStatus: "Registered"},
	}

	fmt.Println("InitLedger called - Adding initial properties")

	for _, property := range properties {
		propertyJSON, err := json.Marshal(property)
		if err != nil {
			fmt.Println("Error marshaling property:", err)
			return err
		}

		err = ctx.GetStub().PutState(property.ID, propertyJSON)
		if err != nil {
			fmt.Println("Error saving property:", err)
			return fmt.Errorf("failed to put to world state. %v", err)
		}

		fmt.Println("Property added:", string(propertyJSON))
	}

	fmt.Println("InitLedger completed successfully")
	return nil
}

func (s *SmartContract) RegisterProperty(ctx contractapi.TransactionContextInterface, id string, owner string, propertyType string, location string, size float64, marketValue float64) error {
	exists, err := s.PropertyExists(ctx, id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("Property %s already exists", id)
	}

	property := Property{
		ID:                 id,
		Owner:              owner,
		PropertyType:       propertyType,
		Location:           location,
		Size:               size,
		MarketValue:        marketValue,
		RegistrationStatus: "Pending",
	}

	propertyJSON, err := json.Marshal(property)
	if err != nil {
		fmt.Println("Error marshaling property:", err)
		return err
	}

	err = ctx.GetStub().PutState(id, propertyJSON)
	if err != nil {
		fmt.Println("Error saving new property:", err)
		return fmt.Errorf("failed to put new property to world state. %v", err)
	}

	fmt.Println("New property registered:", string(propertyJSON))
	return nil
}

func (s *SmartContract) ReadProperty(ctx contractapi.TransactionContextInterface, id string) (*Property, error) {
	propertyJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		fmt.Println("Error reading property:", err)
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if propertyJSON == nil {
		fmt.Println("The property", id, "does not exist")
		return nil, fmt.Errorf("the property %s does not exist", id)
	}

	var property Property
	err = json.Unmarshal(propertyJSON, &property)
	if err != nil {
		fmt.Println("Error unmarshaling property:", err)
		return nil, err
	}

	fmt.Println("Read property:", property)
	return &property, nil
}

func (s *SmartContract) UpdateProperty(ctx contractapi.TransactionContextInterface, id string, propertyType string, location string, size float64, marketValue float64) error {
	property, err := s.ReadProperty(ctx, id)
	if err != nil {
		return err
	}

	property.PropertyType = propertyType
	property.Location = location
	property.Size = size
	property.MarketValue = marketValue

	propertyJSON, err := json.Marshal(property)
	if err != nil {
		fmt.Println("Error marshaling updated property:", err)
		return err
	}

	err = ctx.GetStub().PutState(id, propertyJSON)
	if err != nil {
		fmt.Println("Error saving updated property:", err)
		return err
	}

	fmt.Println("Property updated:", string(propertyJSON))
	return nil
}

func (s *SmartContract) TransferProperty(ctx contractapi.TransactionContextInterface, id string, newOwner string) error {
	property, err := s.ReadProperty(ctx, id)
	if err != nil {
		return err
	}

	oldOwner := property.Owner
	property.Owner = newOwner

	propertyJSON, err := json.Marshal(property)
	if err != nil {
		fmt.Println("Error marshaling transferred property:", err)
		return err
	}

	err = ctx.GetStub().PutState(id, propertyJSON)
	if err != nil {
		fmt.Println("Error saving transferred property:", err)
		return err
	}

	fmt.Println("Property transferred from", oldOwner, "to", newOwner)
	return nil
}

func (s *SmartContract) ApproveRegistration(ctx contractapi.TransactionContextInterface, id string) error {
	property, err := s.ReadProperty(ctx, id)
	if err != nil {
		return err
	}

	property.RegistrationStatus = "Registered"

	propertyJSON, err := json.Marshal(property)
	if err != nil {
		return err
	}

	err = ctx.GetStub().PutState(id, propertyJSON)
	if err != nil {
		return err
	}

	fmt.Println("Property", id, "registration approved")
	return nil
}

func (s *SmartContract) DeleteProperty(ctx contractapi.TransactionContextInterface, id string) error {
	exists, err := s.PropertyExists(ctx, id)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("The property %s does not exist", id)
	}

	err = ctx.GetStub().DelState(id)
	if err != nil {
		fmt.Println("Error deleting property:", err)
		return fmt.Errorf("failed to delete property from world state. %v", err)
	}

	fmt.Println("Property deleted:", id)
	return nil
}

func (s *SmartContract) GetAllProperties(ctx contractapi.TransactionContextInterface) ([]*Property, error) {
	fmt.Println("Running GetAllProperties")

	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		fmt.Println("Error getting properties:", err)
		return nil, err
	}
	defer resultsIterator.Close()

	var properties []*Property
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			fmt.Println("Error iterating properties:", err)
			return nil, err
		}

		var property Property
		err = json.Unmarshal(queryResponse.Value, &property)
		if err != nil {
			fmt.Println("Error unmarshaling property:", err)
			return nil, err
		}

		fmt.Println("Found property:", property)
		properties = append(properties, &property)
	}

	fmt.Println("GetAllProperties found", len(properties), "properties")
	return properties, nil
}

func (s *SmartContract) PropertyExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
	propertyJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	exists := propertyJSON != nil
	fmt.Println("PropertyExists check for", id, ":", exists)
	return exists, nil
}