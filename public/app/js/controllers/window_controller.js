angular.module('dendroIMApp.controllers')
    /*
     *  Window controller
     */
    .controller('windowCtrl', function (
        $scope,
        $http,
        $filter,
        $q,
        $log,
        $localStorage,
        $timeout,
        windowService,
        storageService
    )
{
    $scope.get_current_url = function()
    {
        var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
        return newURL;
    };

    $scope.get_last_section_of_url = function(url)
    {
        return url.substr(url.lastIndexOf('/') + 1);
    };

    $scope.show_popup = function(type, title, message)
    {
        windowService.show_popup(type,title,message);
    };

    $scope.valid_date = function(descriptor)
    {
        if(descriptor.value != null)
        {
            return windowService.valid_date(descriptor.value);
        }
        else
        {
            return false;
        }
    };

    $scope.set_from_local_storage_and_then_from_value = function(key, value, targetObject, namespace)
    {
        var storedValue = storageService.load_from_local_storage(key, targetObject, namespace);

        if(key != null)
        {
            if(storedValue != null)
            {
                if(targetObject != null)
                {
                    if(namespace != null)
                    {
                        if(targetObject[namespace] != null && targetObject[namespace][key] == null)
                        {
                            targetObject[namespace][key] = value;
                        }
                        else if(targetObject[namespace] == null)
                        {
                            targetObject[namespace] = {};
                            targetObject[namespace][key] = value;
                        }
                    }
                    else
                    {
                        if(targetObject[key] == null)
                        {
                            targetObject[key] = value;
                        }
                    }
                }
                else
                {
                    if(namespace != null)
                    {
                        if($scope[namespace] != null && $scope[namespace][key] == null)
                        {
                            $scope[namespace][key] = value;
                        }
                        else if($scope[namespace] == null)
                        {
                            $scope[namespace] = {};
                            $scope[namespace][key] = value;
                        }
                    }
                    else
                    {
                        $scope[key] = storedValue;
                    }
                }
            }
            else
            {
                if(namespace != null)
                {
                    if($scope[namespace] == null)
                    {
                        $scope[namespace] = {};
                    }

                    $scope[namespace][key] = value;
                }
                else
                {
                    $scope[key] = value;
                }
            }
        }

    };

});