import { Test } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductRepository } from './products-repository';
import { ProductImagesRepository } from './product-images-repository';
import { ProductLocationsRepository } from './product-locations-repository';
import { NotFoundException } from '@nestjs/common';

const mockProductsRepository = () => ({
  getAllProducts: jest.fn(),
  findOne: jest.fn(),
  creatProduct: jest.fn(),
  delete: jest.fn(),
  updateProduct: jest.fn(),
});

const mockProductImagesRepository = () => ({
  delete: jest.fn(),
  createProductImage: jest.fn()
});

const mockProductLocationsRepository = () => ({
  delete: jest.fn(),
  createLocationWiseProductQty: jest.fn()
});



describe('ProductsService', () => {
  let productsService: ProductsService;
  let productsRepository: any;
  let productImagesRepository: any;
  let productLocationsRepository: any;


  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductRepository, useFactory: mockProductsRepository },
        { provide: ProductImagesRepository, useFactory: mockProductImagesRepository },
        { provide: ProductLocationsRepository, useFactory: mockProductLocationsRepository },
      ],
    }).compile();

    productsService = await module.get<ProductsService>(ProductsService);
    productsRepository = await module.get<ProductRepository>(ProductRepository);
    productImagesRepository = await module.get<ProductImagesRepository>(ProductImagesRepository);
    productLocationsRepository = await module.get<ProductImagesRepository>(ProductImagesRepository);
  });

  describe('getAllProducts', () => {
    it('gets all products from the repository', async () => {
      const mockRes = [{ "id": 1, "name": "Upate Title", "price": 12.2, "type": 1, "created_at": "2024-01-29T17:46:39.901Z", "updated_at": "2024-01-29T17:51:03.000Z", "productImages": [{ "id": 1, "productId": 1, "image": "http://localhost:3000/product/file_example_JPG_100kB-2f41.jpg", "created_at": "2024-01-29T17:46:39.910Z", "updated_at": "2024-01-29T17:46:39.910Z" }], "productLocations": [{ "id": 3, "productId": 1, "locationId": 3, "qty": 3, "created_at": "2024-01-29T17:47:39.569Z", "updated_at": "2024-01-29T17:47:39.569Z" }, { "id": 4, "productId": 1, "locationId": 4, "qty": 4, "created_at": "2024-01-29T17:47:39.570Z", "updated_at": "2024-01-29T17:47:39.570Z" }] }];
      productsRepository.getAllProducts.mockResolvedValue(mockRes);
      expect(productsRepository.getAllProducts).not.toHaveBeenCalled();
      const result = await productsService.findAll();
      expect(productsRepository.getAllProducts).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });


  describe('getProductById', () => {
    it('calls productsRepository.findOne() and successfully retrieve and return the product', async () => {
      const mockProduct = { "id": 1, "name": "Upate Title", "price": 12.2, "type": 1, "created_at": "2024-01-29T17:46:39.901Z", "updated_at": "2024-01-29T17:51:03.000Z", "productImages": [{ "id": 1, "productId": 1, "image": "http://localhost:3000/product/file_example_JPG_100kB-2f41.jpg", "created_at": "2024-01-29T17:46:39.910Z", "updated_at": "2024-01-29T17:46:39.910Z" }], "productLocations": [{ "id": 3, "productId": 1, "locationId": 3, "qty": 3, "created_at": "2024-01-29T17:47:39.569Z", "updated_at": "2024-01-29T17:47:39.569Z" }, { "id": 4, "productId": 1, "locationId": 4, "qty": 4, "created_at": "2024-01-29T17:47:39.570Z", "updated_at": "2024-01-29T17:47:39.570Z" }] };
      productsRepository.findOne.mockResolvedValue(mockProduct);

      const result = await productsService.findOne(1);
      expect(result).toEqual(mockProduct);
      expect(productsRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1
        }
      });
    });

    it('throws an error as product is not found', () => {
      productsRepository.findOne.mockResolvedValue(null);
      expect(productsService.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteProductById', () => {
    it('calls productsRepository.delete() and successfully delete product', async () => {
      const id: number = 1;
      productsRepository.delete.mockResolvedValue({ id });
      productImagesRepository.delete.mockResolvedValue({ productId: id });
      productLocationsRepository.delete.mockResolvedValue({ productId: id });
      const result = await productsService.remove(id);
      expect(result).toEqual(undefined);
    });
  });


  describe('createProduct', () => {
    it('calls productsRepository.creatProduct() and successfully insert and return the product', async () => {
      const mockProductPayload = { "name": "Upate 123", "price": 12.22, "type": 0, "locationQty": "[{\"locationId\":3,\"qty\":3},{\"locationId\":4,\"qty\":4}]" };
      const mockRes = { name: 'Upate 123', price: 12.22, type: 0, locationQty: "[{\"locationId\":3,\"qty\":3},{\"locationId\":4,\"qty\":4}]" };

      productsRepository.creatProduct.mockResolvedValue(mockProductPayload);
      expect(productsRepository.creatProduct).not.toHaveBeenCalled();
      const result = await productsService.create(mockProductPayload, []);
      expect(productsRepository.creatProduct).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });


  describe('updateProduct', () => {
    it('calls productsRepository.updateProduct() and successfully update and return the product', async () => {
      const id = 1;
      const mockProductPayload = { "name": "Upate 123", "price": 12.22, "type": 0, images: [], "locationQty": "[{\"locationId\":3,\"qty\":3},{\"locationId\":4,\"qty\":4}]" };
      const mockRes = { name: 'Upate 123', price: 12.22, type: 0, images: [], locationQty: "[{\"locationId\":3,\"qty\":3},{\"locationId\":4,\"qty\":4}]" }

      productsRepository.updateProduct.mockResolvedValue(mockProductPayload);
      expect(productsRepository.updateProduct).not.toHaveBeenCalled();
      const result = await productsService.update(id, mockProductPayload, []);
      expect(productsRepository.updateProduct).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });

});
