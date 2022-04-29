public with sharing class SampleController {
    
    @AuraEnabled
    public static Account getAccountById(Id accountId) {
        return [select Id, Name, Description from Account where Id = :accountId limit 1];
    }

    @AuraEnabled
    public static Boolean updateName(Id accountId, String name) {
        Account a = new Account(Id = accountId, Name = name);
        Database.SaveResult result = Database.update(a);
        return result.success;
    }

    @AuraEnabled
    public static Boolean updateDescription(Id accountId, String description) {
        Account a = new Account(Id = accountId, Description = description);
        Database.SaveResult result = Database.update(a);
        return result.success;
    }
}
