using { cuid } from '@sap/cds/common';
namespace myFinal;


// Notas en servicio


entity Products {
    key ProductID       : Integer;
    ProductName         : String;
    // SupplierID          : Integer;
    // CategoryID          : Integer;
    QuantityPerUnit     : String;
    UnitPrice           : Decimal;
    UnitsInStock        : Integer;
    UnitsOnOrder        : Integer;
    // ReorderLevel        : Integer;
    // Discontinued        : Boolean;
    relOrder            : Association to many Order_Details on relOrder.ProductID = $self;
}

entity Order_Details {
    key ProductID       : Association to Products;
    key OrderID         : Association to Orders;
    UnitPrice           : Decimal;
    Quantity            : Integer;
    Discount            : Decimal;
}

entity Orders {
    key OrderID         : Integer;
    AuxID               : String;       //id add = orderdate + shipregion
    // CustomerID          : String;
    // EmployeeID          : Integer;
    // OrderDate           : DateTime;
    // RequiredDate        : DateTime;
    // ShippedDate         : DateTime;
    // ShipVia             : Integer;
    // Freight             : Decimal;
    ShipName            : String;
    // ShipAddress         : String;
    // ShipCity            : String;
    // ShipRegion          : String;
    // ShipPostalCode      : String;
    // ShipCountry         : String;
    relProduct             : Association to many Order_Details on relProduct.OrderID = $self;
}