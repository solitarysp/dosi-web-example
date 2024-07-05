```
---src
|   +---main
|   |   +---java
|   |   |   \---vn
|   |   |       \---com
|   |   |           \---viettel
|   |   |               \---vds
|   |   |                   \---archclientddd
|   |   |                       |   Application.java # Main Start app
|   |   |                       |   
|   |   |                       +---api # Các API Open cho client giao tiếp đến
|   |   |                       |   +---grpc # định nghĩa các GRPC và các component chỉ phục vụ cho GRPC
|   |   |                       |   |       HelloWorldGRPCServerController.java
|   |   |                       |   |       
|   |   |                       |   +---rest # Định nghĩa các restful và các component chỉ phục vụ cho rest
|   |   |                       |   |   +---aop
|   |   |                       |   |   |       .gitkeep
|   |   |                       |   |   |       
|   |   |                       |   |   +---constant
|   |   |                       |   |   |       ResponseStatusCodeEnumClient.java
|   |   |                       |   |   |       
|   |   |                       |   |   +---dto # DTO của rest
|   |   |                       |   |   |   +---request
|   |   |                       |   |   |   |       CreateUserDetailDto.java
|   |   |                       |   |   |   |       PostAddressRequestDto.java
|   |   |                       |   |   |   |       PostUserAndAddressRequestDto.java
|   |   |                       |   |   |   |       PostUserRequestDto.java
|   |   |                       |   |   |   |       
|   |   |                       |   |   |   \---response
|   |   |                       |   |   |           PostUserAndAddressResponseDto.java
|   |   |                       |   |   |           
|   |   |                       |   |   +---exception  # Định nghĩa exception của rest định nghĩa
|   |   |                       |   |   |       .gitkeep
|   |   |                       |   |   |       
|   |   |                       |   |   +---router # Nơi config các đầu API rest
|   |   |                       |   |   |   |   UserDetailController.java
|   |   |                       |   |   \---service # Service của rest
|   |   |                       |   |       |   RepoServiceFacade.java
|   |   |                       |   |       |   
|   |   |                       |   |       \---impl
|   |   |                       |   |               DefaultRepoServiceFacade.java
|   |   |                       |   |               
|   |   |                       |   \---stream 
|   |   |                       |       \---kafka
|   |   |                       |               DemoListenKafka.java
|   |   |                       |               
|   |   |                       +---application # chứa các config, component của application; là cầu nối giữa tầng nghiệp vụ (domain) và tầng presentation (api) và infrastructure)
|   |   |                       |   +---configuration # Chứa các config ví dụ config connect db..etc..
|   |   |                       |   |       AddressDatabaseConfig.java
|   |   |                       |   |       ChainedTransactionManageConfig.java
|   |   |                       |   |       UserDatabaseConfig.java
|   |   |                       |   |       
|   |   |                       |   +---exception # chứa các exception mà layer application định nghĩa
|   |   |                       |   |       .gitkeep
|   |   |                       |   |       
|   |   |                       |   +---repository # Repo của application thường impl repo của domain sau đó thực hiện các hành vi CURD
|   |   |                       |   |       UserDetailRepositoryImpl.java
|   |   |                       |   |       
|   |   |                       |   \---service # Service application, thường impl của domain để phục vụ business của domain
|   |   |                       |           UserDetailServiceImpl.java
|   |   |                       |           
|   |   |                       +---commons # Chứa các utils commons
|   |   |                       |       StringUtils.java
|   |   |                       |       
|   |   |                       +---domain #  (chứa mọi thông tin về  business domain)
|   |   |                       |   +---entity # Chứa các entity của domain
|   |   |                       |   |       UserDetailEntity.java
|   |   |                       |   |       
|   |   |                       |   +---exceptions # Định nghĩa các exceptions mà domain định nghĩa
|   |   |                       |   |       UserDetailException.java
|   |   |                       |   |       
|   |   |                       |   +---repository # Các hoạt động trên entity
|   |   |                       |   |       UserDetailRepository.java
|   |   |                       |   |       
|   |   |                       |   \---service # Các dịch vụ của domain
|   |   |                       |           UserDetailService.java
|   |   |                       |           
|   |   |                       \---infrastructure #  Chứa các kết nối với các thành phần bên ngoài để phục vụ cho ứng dụng (DB,MQ...)
|   |   |                           \---database
|   |   |                               +---address
|   |   |                               |   +---entity
|   |   |                               |   |       AddressEntity.java
|   |   |                               |   |       
|   |   |                               |   \---repository
|   |   |                               |           AddressEntityRepo.java
|   |   |                               |           
|   |   |                               \---user
|   |   |                                   +---entity
|   |   |                                   |       UserEntity.java
|   |   |                                   |       
|   |   |                                   \---repository
|   |   |                                           UserRepo.java
|   |   |                                           
|   |   \---resources
|   |           application.properties
|   |           bootstrap.properties
|   |           messages_en.properties
|   |           messages_vi.properties
|   |           
|   \---test
|       +---java
|       |   \---vn
|       |       \---com
|       |           \---viettel
|       |               \---vds
|       |                   \---archclientddd
|       |                           DemoTest.java
|       |                           
|       \---resources

```
