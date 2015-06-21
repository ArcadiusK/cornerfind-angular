'use strict';

angular.module('cornerfindApp')
    .controller('AddProductCtrl', function($scope, brand, condition, category, $q, products, Auth, $state) {

        if(!Auth.isLoggedIn()){
            return $state.go('login')
        }


        //GET all Brands and Categories
        $scope.availableBrands = brand.query();
        $scope.availableCategories = category.query();
        $scope.availableConditions = condition.query();
        $scope.userId = Auth.getCurrentUser()._id;

        //Add a new product
        $scope.newProduct = {
            userId: $scope.userId,
            category: [],
            photoUrls: []
        };
        $scope.newProductDisplay = {
            category: []
        };

        $scope.showBrands = false;
        $scope.showCategories = false;
        $scope.brandButton = 'Choose a Brand';
        $scope.categoryButton = 'Choose a Category';
        $scope.conditionButton = 'Choose a Condition';

        $scope.chooseBrand = function() {
            $scope.showBrands = true;
        }

        $scope.selectBrand = function(selected) {
            $scope.newProduct.brand = selected;
            $scope.showBrands = false;
            $scope.brandButton = selected;
        }

        $scope.chooseCategory = function() {
            $scope.showCategories = true;
        }

        $scope.selectCategory = function(selected) {
            $scope.newProduct.category = selected;
            $scope.showCategories = false;
            $scope.categoryButton = selected;
        }

         $scope.chooseCondition = function() {
            $scope.showConditions = true;
        }

        $scope.selectCondition = function(selected) {
            $scope.newProduct.condition = selected;
            $scope.showConditions = false;
            $scope.conditionButton = selected;
        }

        $scope.addProduct=function(newProduct){
            products.resource.save(newProduct,function(){
                console.log('Save Callback ',arguments)
                toast('Succesffuly added!', 4000);
            });
        }


        //Run this function when the input is changed
        $scope.upload = function(thing) {
            //Lines 7 and 8 are reliable ways to pull out the file name so it's saved in a friendly manner in the bucket.
            var file_name = angular.element('#file-upload').val().split('\\');
            file_name = file_name[file_name.length - 1];

            console.log('filename',file_name);

            //S3 Upload is a separate client side library I'll attach
            var s3upload = new S3Upload({
                //The file input
                file_dom_selector: 'file-upload',
                //The name from above
                s3_object_name: new Date().getTime() + file_name,
                //The route that will receive the upload and send to S3
                //See below
                s3_sign_put_url: 'api/products/sign_s3',
                //Use this hook for a nice progress bar!
                onProgress: function(percent, message) {
                    console.log('Upload progress: ' + percent + '% ' + message);
                },
                onFinishS3Put: function(public_url) {
                    console.log('Upload completed. Uploaded to: ' + public_url)
                    $scope.$apply(function() {
                        $scope.newProduct.photoUrls.push(public_url);
                    });

                },
                onError: function(status) {
                    console.log('Upload error: ' + status);
                }
            });
        }
    });