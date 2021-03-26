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
    UnitsInStock        : Integer; //
    UnitsOnOrder        : Integer; //
    // ReorderLevel        : Integer;
    // Discontinued        : Boolean;
    order               : Association to many Order_Details on order.ProductID = $self;
}

entity Order_Details {
    key ProductID       : Association to Products;
    key OrderID         : Association to Orders;
    UnitPrice           : Decimal;
    Quantity            : Integer; //
    Discount            : Decimal;
}

entity Orders { //id add = orderdate + shipregion
    key OrderID         : Integer;
    AuxID               : String;
    // CustomerID          : String;
    // EmployeeID          : Integer;
    // OrderDate           : DateTime; //'1996-11-06T00:00:00Z'
    // RequiredDate        : DateTime;
    // ShippedDate         : DateTime;
    // ShipVia             : Integer;
    // Freight             : Decimal;
    // ShipName            : String;
    // ShipAddress         : String;
    // ShipCity            : String;
    // ShipRegion          : String; //
    // ShipPostalCode      : String;
    // ShipCountry         : String;
    product             : Association to many Order_Details on product.OrderID = $self;
}