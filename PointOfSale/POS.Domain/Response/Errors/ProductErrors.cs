﻿using POS.Domain.Models.Enums;

namespace POS.Domain.Response.Errors
{
    public class ProductErrors
    {
        public static Error NULL => new(ErrorCode.NULL, "Product", "Product(s) cannnot be NULL.");
        public static Error NotFound(Guid id) => new(ErrorCode.NotFound, "Product", $"Product with an Id {id} is not found in the database.");
        public static Error Exist(string name, Guid categoryId) => new(ErrorCode.Exist, "Product", $"Product {name} with category {categoryId} is already exist in the database.");
    }
}
